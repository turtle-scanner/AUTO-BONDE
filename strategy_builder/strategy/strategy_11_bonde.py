from core import data_fetcher, indicators
from core.signal import Signal, Action
from strategy.base_strategy import BaseStrategy


class BondeStrategy(BaseStrategy):
    """
    Bonde (Stockbee) Strict Strategy
    
    1. Momentum Burst (MB): Pct >= 4%, Vol > V1, TI65 >= 1.05
    2. Episodic Pivot (EP): Pct >= 10%, Vol >= 3 * AvgV50
    3. 9 Million EP: Vol >= 9,000,000
    4. Anti-Bagholder: Exclude if up for 3 consecutive days
    5. Nano Banana (NB): Parabolic Curve Acceleration + Huge Vol (5x AvgV50)
    """

    def __init__(
        self,
        min_change_mb: float = 4.0,
        min_change_ep: float = 10.0,
        ti65_threshold: float = 1.05,
        vol_ratio_ep: float = 3.0,
        vol_threshold_9m: int = 9000000
    ):
        self.min_change_mb = min_change_mb
        self.min_change_ep = min_change_ep
        self.ti65_threshold = ti65_threshold
        self.vol_ratio_ep = vol_ratio_ep
        self.vol_threshold_9m = vol_threshold_9m

    @property
    def name(self) -> str:
        return "본데(Stockbee) Strict"

    @property
    def required_days(self) -> int:
        return 100  # SMA 65 및 AvgV 50 계산을 위해 100일 필요

    def generate_signal(self, stock_code: str, stock_name: str) -> Signal:
        # 데이터 조회
        df = data_fetcher.get_daily_prices(stock_code, self.required_days)
        
        if df.empty or len(df) < 65:
            return Signal(
                stock_code=stock_code,
                stock_name=stock_name,
                action=Action.HOLD,
                strength=0.0,
                reason="데이터 부족 (최소 65일 필요)"
            )

        # 지표 계산
        df['C1'] = df['close'].shift(1)
        df['V1'] = df['volume'].shift(1)
        df['Pct_Change'] = ((df['close'] - df['C1']) / df['C1']) * 100
        
        # TI65 (추세 강도: 7일선 / 65일선)
        sma7 = indicators.calc_ma(df, 7)
        sma65 = indicators.calc_ma(df, 65)
        ti65 = (sma7 / sma65).iloc[-1]
        
        # 50일 평균 거래량
        avg_v50 = indicators.calc_volume_ma(df, 50).iloc[-1]
        
        latest = df.iloc[-1]
        prev_3_days_up = (df['close'].iloc[-1] > df['close'].iloc[-2] > df['close'].iloc[-3] > df['close'].iloc[-4])

        setups = []
        
        # AVOID_BAGHOLDER: 3일 연속 상승 종목 배제
        if prev_3_days_up:
            return Signal(
                stock_code=stock_code,
                stock_name=stock_name,
                action=Action.HOLD,
                strength=0.0,
                reason="추격 매수 금지 (3일 연속 상승)"
            )

        # 1. 4% Momentum Burst (MB)
        # 당일 고가 부근 마감 확인 (고가-저가 범위의 상위 25% 이내)
        day_range = latest['high'] - latest['low']
        close_location = (latest['close'] - latest['low']) / day_range if day_range > 0 else 0
        
        is_mb = (latest['Pct_Change'] >= self.min_change_mb) and \
                (latest['volume'] > latest['V1']) and \
                (ti65 >= self.ti65_threshold) and \
                (close_location >= 0.75) # 고가 부근 마감 (Stockbee Rule)
                
        if is_mb: setups.append("4% MB")
        
        # 2. Classic EP
        is_ep = (latest['Pct_Change'] >= self.min_change_ep) and \
                (latest['volume'] >= self.vol_ratio_ep * avg_v50)
        if is_ep: setups.append("Classic EP")
            
        # 3. 9 Million EP
        is_9m = (latest['volume'] >= self.vol_threshold_9m)
        if is_9m: setups.append("9M EP")
        
        # 4. Nano Banana (NB) - Parabolic Move
        # 최근 5일 이평선이 급격히 꺾여 올라가는 패턴 (바나나 곡선)
        sma5 = indicators.calc_ma(df, 5)
        slope_today = sma5.iloc[-1] - sma5.iloc[-2]
        slope_prev = sma5.iloc[-2] - sma5.iloc[-3]
        
        is_nano_banana = (latest['Pct_Change'] >= 15.0) and \
                         (latest['volume'] >= 5.0 * avg_v50) and \
                         (slope_today > slope_prev * 1.5) # 기울기 가속
                         
        if is_nano_banana: setups.append("🍌 Nano Banana")

        if setups:
            # RS 점수 계산 (최근 6개월(126일) 수익률 기반 - Bonde's Real RS)
            if len(df) >= 126:
                df['RS_Score'] = df['close'] / df['close'].shift(126) * 100
            else:
                df['RS_Score'] = df['close'] / df['close'].iloc[0] * 100
                
            rs_score = df['RS_Score'].iloc[-1]
            
            # LOD (당일 최저점)를 손절가로 설정
            lod_price = latest['low']
            return Signal(
                stock_code=stock_code,
                stock_name=stock_name,
                action=Action.BUY,
                strength=1.0 if is_nano_banana else (0.9 if rs_score > 120 else 0.7),
                reason=f"본데 셋업 포착 ({' | '.join(setups)}) | RS: {rs_score:.1f} | TI65: {ti65:.3f}",
                stop_loss=lod_price,
                target_price=None  # 시장가 진입
            )
        
        return Signal(
            stock_code=stock_code,
            stock_name=stock_name,
            action=Action.HOLD,
            strength=0.0,
            reason="조건 미충족"
        )
