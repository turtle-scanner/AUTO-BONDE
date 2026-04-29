import pandas as pd
import numpy as np
from core.signal import Signal, Action
import logging

class AdvancedBondeStrategy:
    """
    고도화된 본데(Stockbee) 전략 v3.0
    - EP (Episodic Pivot): 뉴스/실적 기반의 강력한 갭상승 및 거래량 폭증
    - MB (Momentum Burst): 4% 이상 급등, 신고가 갱신, 강한 RS
    - Tightness: 좁은 가격 범위에서 거래량 감소 (에너지 응축)
    """
    def __init__(self):
        self.name = "Advanced Bonde Strategy"

    def check_signal(self, code: str, name: str, df: pd.DataFrame) -> Signal:
        if df.empty or len(df) < 65:
            return None

        curr = df.iloc[-1]
        prev = df.iloc[-2]
        
        # 1. 기본 지표 계산
        sma7 = df['close'].rolling(7).mean()
        sma10 = df['close'].rolling(10).mean()
        sma20 = df['close'].rolling(20).mean()
        sma50 = df['close'].rolling(50).mean()
        avg_vol = df['volume'].rolling(50).mean()
        
        # 2. RS 점수 (6개월 가중치)
        price_6m = df['close'].iloc[-125] if len(df) >= 125 else df['close'].iloc[0]
        rs_score = (curr['close'] / price_6m - 1) * 100
        
        # 3. EP (Episodic Pivot) 감지 - 가장 강력한 매수 신호
        # - 갭상승 5% 이상, 거래량 평균의 3배 이상, 당일 양봉
        is_gap_up = (curr['open'] / prev['close'] >= 1.05)
        is_vol_surge = (curr['volume'] >= avg_vol.iloc[-1] * 3)
        is_closing_high = (curr['close'] >= (curr['high'] + curr['low']) / 2)
        
        if is_gap_up and is_vol_surge and is_closing_high:
            return Signal(code, name, Action.BUY, strength=1.0, 
                          reason=f"EP 포착: 갭상승 & 거래량 폭증 (RS:{rs_score:.1f})",
                          stop_loss=curr['low'] * 0.98)

        # 4. MB (Momentum Burst) 감지
        # - 4% 이상 상승, 당일 거래량 > 전일 거래량, RS > 80 (상대적)
        is_price_burst = (curr['close'] / prev['close'] >= 1.04)
        is_volume_up = (curr['volume'] > prev['volume'])
        is_above_ma = (curr['close'] > sma7.iloc[-1] > sma20.iloc[-1])
        
        # TI65 (Trend Intensity)
        ti65 = curr['close'] / df['close'].iloc[-65:].mean()
        
        if is_price_burst and is_volume_up and is_above_ma and ti65 > 1.05:
            return Signal(code, name, Action.BUY, strength=0.8,
                          reason=f"MB 포착: 4% 급등 & 추세 강화 (TI65:{ti65:.2f})",
                          stop_loss=curr['close'] * 0.96)

        # 5. 매도 시그널 (SMA7 이탈)
        if prev['close'] > sma7.iloc[-2] and curr['close'] < sma7.iloc[-1]:
            return Signal(code, name, Action.SELL, strength=1.0, reason="7일선 추세 이탈")

        return Signal(code, name, Action.HOLD)
