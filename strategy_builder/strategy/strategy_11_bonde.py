from strategy.base_strategy import BaseStrategy
from core import data_fetcher
import pandas as pd
import numpy as np
from core.signal import Signal, Action
import logging

class BondeStrategy(BaseStrategy):
    """
    고도화된 본데(Stockbee) 전략 v3.0
    - EP (Episodic Pivot): 뉴스/실적 기반의 강력한 갭상승 및 거래량 폭증
    - MB (Momentum Burst): 4% 이상 급등, 신고가 갱신, 강한 RS
    - Tightness: 좁은 가격 범위에서 거래량 감소 (에너지 응축)
    """
    def __init__(self, min_change_mb=4.0):
        self._name = "Advanced Bonde Strategy"
        self.min_change_mb = min_change_mb

    @property
    def name(self) -> str:
        return self._name

    @property
    def required_days(self) -> int:
        return 150

    def generate_signal(self, stock_code: str, stock_name: str) -> Signal:
        """BaseStrategy 인터페이스 구현"""
        df = data_fetcher.get_daily_prices(stock_code, days=self.required_days)
        return self.check_signal(stock_code, stock_name, df)

    def check_signal(self, code: str, name: str, df: pd.DataFrame) -> Signal:
        """기존 코드와의 호환성을 위한 메서드"""
        if df is None or df.empty or len(df) < 65:
            return Signal(code, name, Action.HOLD, reason="데이터 부족")

        curr = df.iloc[-1]
        prev = df.iloc[-2]
        
        # 1. 기본 지표 계산
        sma7 = df['close'].rolling(7).mean()
        avg_vol = df['volume'].rolling(50).mean()
        
        # 2. RS 점수 (6개월 가중치)
        price_6m = df['close'].iloc[-125] if len(df) >= 125 else df['close'].iloc[0]
        rs_score = (curr['close'] / price_6m - 1) * 100
        
        # 3. EP (Episodic Pivot) 감지
        is_gap_up = (curr['open'] / prev['close'] >= 1.05)
        is_vol_surge = (curr['volume'] >= avg_vol.iloc[-1] * 3)
        is_closing_high = (curr['close'] >= (curr['high'] + curr['low']) / 2)
        
        if is_gap_up and is_vol_surge and is_closing_high:
            return Signal(code, name, Action.BUY, strength=1.0, 
                          reason=f"EP 포착: 갭상승 & 거래량 폭증 (RS:{rs_score:.1f})",
                          stop_loss=curr['low'] * 0.98)

        # 4. MB (Momentum Burst) 감지
        is_price_burst = (curr['close'] / prev['close'] >= (1 + self.min_change_mb/100))
        is_volume_up = (curr['volume'] > prev['volume'])
        
        # TI65 (Trend Intensity)
        ti65 = curr['close'] / df['close'].iloc[-65:].mean()
        
        if is_price_burst and is_volume_up and ti65 > 1.05:
            return Signal(code, name, Action.BUY, strength=0.8,
                          reason=f"MB 포착: {self.min_change_mb}% 급등 & 추세 강화",
                          stop_loss=curr['close'] * 0.96)

        # 5. 매도 시그널 (SMA7 이탈)
        if prev['close'] > sma7.iloc[-2] and curr['close'] < sma7.iloc[-1]:
            return Signal(code, name, Action.SELL, strength=1.0, reason="7일선 추세 이탈")

        return Signal(code, name, Action.HOLD)

# 호환성을 위한 별칭
AdvancedBondeStrategy = BondeStrategy
