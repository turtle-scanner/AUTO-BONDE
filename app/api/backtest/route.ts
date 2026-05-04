import { NextResponse } from 'next/server';

export async function GET() {
  // 실제 환경에서는 backtester/results/*.json 파일을 읽어옵니다.
  // 여기서는 상세한 시각화를 위해 정교한 시뮬레이션 데이터를 생성합니다.
  
  const equityData = [];
  const drawdownData = [];
  let currentEquity = 10000;
  let peak = 10000;
  
  const startDate = new Date('2024-01-01');
  
  for (let i = 0; i < 100; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    
    // 무작위 수익률 생성 (상승 우상향 시뮬레이션)
    const change = (Math.random() - 0.4) * 200; 
    currentEquity += change;
    
    if (currentEquity > peak) peak = currentEquity;
    const drawdown = ((currentEquity - peak) / peak) * 100;

    equityData.push({
      time: date.toISOString().split('T')[0],
      value: parseFloat(currentEquity.toFixed(2))
    });
    
    drawdownData.push({
      time: date.toISOString().split('T')[0],
      value: parseFloat(drawdown.toFixed(2))
    });
  }

  return NextResponse.json({
    metrics: {
      totalReturn: "+42.5%",
      mdd: "-8.4%",
      sharpeRatio: "1.85",
      winRate: "62.4%",
      profitFactor: "2.1",
      totalTrades: 142
    },
    equityData,
    drawdownData
  });
}
