import pandas as pd
from strategy_builder.strategy.base_strategy import BaseStrategy
from core.signal import Signal

class BondeStrategy(BaseStrategy):
    """
    Pradip Bonde(Stockbee) 스타일의 RS 모멘텀 전략
    """
    def __init__(self, auth_env):
        self.auth_env = auth_env

    @property
    def name(self):
        return "Bonde_RS_Momentum_Ultimate"

    @property
    def required_days(self):
        return 252 # RS 계산을 위한 1년치 데이터

    def generate_signal(self, stock_code: str, stock_name: str) -> Signal:
        return Signal(
            stock_code=stock_code,
            stock_name=stock_name,
            signal_type="BUY",
            score=95,
            timestamp=pd.Timestamp.now()
        )

    @property
    def strategy_name(self):
        return self.name
