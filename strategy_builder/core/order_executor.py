"""
주문 실행 모듈

Applied Skills: skills/investment-strategy-framework.md
- Signal → 실제 주문 변환
- 주문 전 검증 수행
- 주문 구분 매핑
"""

import logging
import math

import pandas as pd

import sys
import os

# 현재 파일의 부모 디렉토리(core)의 부모(strategy_builder)를 경로에 추가
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
if parent_dir not in sys.path:
    sys.path.append(parent_dir)

import kis_auth as ka
from . import data_fetcher
from .position_manager import PositionManager
from .risk_manager import RiskManager
from .signal import Action, Signal

logging.basicConfig(level=logging.INFO)


class OrderExecutor:
    """
    주문 실행 클래스
    """

    def __init__(self, env_dv: str = "demo", allow_duplicate_buy: bool = True):
        """
        Args:
            env_dv: 환경 구분 (real/demo, prod/vps)
            allow_duplicate_buy: 중복 매수 허용 여부 (기본값: True)
                - True: 이미 보유 중인 종목도 추가 매수 가능
                - False: 이미 보유 중인 종목 매수 불가 (기존 동작)
        """
        self.env_dv = env_dv
        self.allow_duplicate_buy = allow_duplicate_buy
        self.position_manager = PositionManager(env_dv)
        self.risk_manager = RiskManager()

    def execute_signal(self, signal: Signal, risk_amount: float = 100000) -> pd.DataFrame:
        """
        시그널을 실제 주문으로 실행

        Args:
            signal: 투자 시그널

        Returns:
            주문 결과 DataFrame (실패 시 빈 DataFrame)

        흐름:
            1. HOLD 시그널 → 무시
            2. 시그널 강도 체크
            3. 중복 주문 체크 (매수)
            4. 보유 여부 체크 (매도)
            5. 주문 파라미터 결정
            6. order_cash() 호출
        """
        # 1. HOLD 시그널 무시
        if signal.action == Action.HOLD:
            logging.info(f"HOLD 시그널 - 주문 생략: {signal.stock_name}")
            return pd.DataFrame()

        # 2. 시그널 강도 체크
        if not signal.is_actionable():
            logging.info(f"약한 시그널 - 주문 생략: {signal} (strength < 0.5)")
            return pd.DataFrame()

        # 3. 매수: 중복 보유 체크 (allow_duplicate_buy가 False일 때만)
        if signal.action == Action.BUY and not self.allow_duplicate_buy:
            if self.position_manager.check_duplicate(signal.stock_code):
                logging.warning(f"이미 보유 중 - 매수 생략: {signal.stock_name}")
                return pd.DataFrame()

        # 4. 매도: 보유 여부 체크
        if signal.action == Action.SELL:
            quantity = self.position_manager.get_holding_quantity(signal.stock_code)
            if quantity <= 0:
                logging.warning(f"미보유 종목 - 매도 생략: {signal.stock_name}")
                return pd.DataFrame()

        # 5. 주문 파라미터 결정
        ord_dvsn, ord_unpr = self._determine_order_type(signal)
        ord_qty = self._calculate_quantity(signal, risk_amount=risk_amount)

        if ord_qty <= 0:
            logging.warning(f"주문 수량 0 - 주문 생략: {signal.stock_name}")
            return pd.DataFrame()

        # 6. 주문 실행
        return self._execute_order(
            signal=signal,
            ord_dvsn=ord_dvsn,
            ord_unpr=ord_unpr,
            ord_qty=ord_qty
        )

    def _get_tick_size(self, price: float, is_us: bool = False) -> float:
        """주식시장 호가단위"""
        if is_us:
            return 0.01  # 미국은 소수점 단위 지원
            
        if price < 2000:
            return 1
        elif price < 5000:
            return 5
        elif price < 20000:
            return 10
        elif price < 50000:
            return 50
        elif price < 200000:
            return 100
        elif price < 500000:
            return 500
        else:
            return 1000

    def _round_to_tick(self, price: float, is_us: bool = False) -> float:
        """가격을 호가단위로 내림 (매수 시 유리한 방향)"""
        tick = self._get_tick_size(price, is_us)
        return float(math.floor(price / tick) * tick)

    def _determine_order_type(self, signal: Signal) -> tuple:
        """
        시그널 강도에 따른 주문 구분 결정
        """
        is_us = not signal.stock_code.isdigit()
        
        if signal.is_strong():
            # 시장가 (한국 01, 미국 '00' + 가격 0)
            return ("01" if not is_us else "00", "0")

        # 지정가
        if signal.target_price:
            adjusted = self._round_to_tick(float(signal.target_price), is_us)
            return ("00", str(adjusted))

        # 현재가로 지정가
        price_info = data_fetcher.get_current_price(signal.stock_code, self.env_dv)
        current_price = price_info.get("price", 0)

        if current_price <= 0:
            return ("01" if not is_us else "00", "0")

        adjusted = self._round_to_tick(float(current_price), is_us)
        return ("00", str(adjusted))

    def _calculate_quantity(self, signal: Signal, risk_amount: float = 100000) -> int:
        """
        리스크 기반 수량 계산
        수량 = 리스크 금액 / (현재가 - 손절가)
        """
        if signal.quantity:
            return signal.quantity

        if signal.action == Action.SELL:
            return self.position_manager.get_holding_quantity(signal.stock_code)

        # 매수 수량 계산
        try:
            price_info = data_fetcher.get_current_price(signal.stock_code, self.env_dv)
            current_price = float(price_info.get("price", 0))
            
            if current_price <= 0:
                return 0

            # 손절가가 지정되지 않은 경우 기본 1% 손절로 가정
            stop_loss = signal.stop_loss if signal.stop_loss else current_price * 0.99
            
            price_diff = abs(current_price - stop_loss)
            if price_diff <= 0:
                return 0
            
            # 미국 주식인 경우 리스크 금액(원화)을 달러로 환산 (대략 1,400원 기준)
            is_us = not signal.stock_code.isdigit()
            effective_risk = risk_amount
            if is_us:
                effective_risk = risk_amount / 1400.0
            
            qty = int(math.floor(effective_risk / price_diff))
            
            # 최소 1주 보장 (단, 현재가보다 리스크 금액이 작으면 0)
            if qty == 0 and effective_risk >= current_price:
                qty = 1
                
            return qty
            
        except Exception as e:
            logging.error(f"수량 계산 중 오류: {e}")
            return 1

    def _execute_order(
        self,
        signal: Signal,
        ord_dvsn: str,
        ord_unpr: str,
        ord_qty: int
    ) -> pd.DataFrame:
        """
        실제 주문 실행 (한국/미국 지원)
        """
        try:
            trenv = ka.getTREnv()
            is_us = not signal.stock_code.isdigit()

            if is_us:
                # 미국 주식 주문 설정
                if self.env_dv in ["real", "prod"]:
                    tr_id = "TTTT1002U" if signal.action == Action.BUY else "TTTT1001U"
                else:
                    tr_id = "VTTT1002U" if signal.action == Action.BUY else "VTTT1001U"
                
                # 현재가 조회 (지정가 00 사용 시 필수)
                curr_price_info = data_fetcher.get_current_price(signal.stock_code, self.env_dv)
                curr_price = float(curr_price_info.get('price', 0))

                params = {
                    "CANO": trenv.my_acct,
                    "ACNT_PRDT_CD": trenv.my_prod,
                    "OVRS_EXCG_CD": "NASD",  # 나스닥 (G 사용)
                    "PDNO": signal.stock_code.upper(),
                    "ORD_DVSN": "00", # 지정가
                    "ORD_QTY": str(int(ord_qty)),
                    "OVRS_ORD_UNPR": str(round(curr_price, 2)),
                    "ORD_SVR_DVSN_CD": "0",
                    "MGN_DVSN": "01",
                    "TR_CRCY_CD": "USD",
                    "SFT_YN": "N"
                }
                api_path = "/uapi/overseas-stock/v1/trading/order"
            else:
                # 한국 주식 주문 설정
                if self.env_dv in ["real", "prod"]:
                    tr_id = "TTTC0802U" if signal.action == Action.BUY else "TTTC0801U"
                else:
                    tr_id = "VTTC0802U" if signal.action == Action.BUY else "VTTC0801U"

                params = {
                    "CANO": trenv.my_acct,
                    "ACNT_PRDT_CD": trenv.my_prod,
                    "PDNO": signal.stock_code,
                    "ORD_DVSN": ord_dvsn,
                    "ORD_QTY": str(ord_qty),
                    "ORD_UNPR": ord_unpr,
                }
                api_path = "/uapi/domestic-stock/v1/trading/order-cash"

            logging.info(f"주문 실행: {signal.stock_name} ({signal.stock_code}) {signal.action.value.upper()} {ord_qty}주")

            res = ka._url_fetch(api_path, tr_id, "", params, postFlag=True)

            if res.isOK():
                result = pd.DataFrame([res.getBody().output])
                logging.info(f"주문 성공: {result.to_dict()}")
                self.position_manager.refresh()
                return result
            else:
                logging.error(f"주문 실패: {signal.stock_name}")
                res.printError(api_path)
                return pd.DataFrame()

        except Exception as e:
            logging.error(f"주문 실행 에러: {e}")
            return pd.DataFrame()

