import { NextResponse } from 'next/server';

export async function GET() {
  // ???æºë†ì¡????ï¿½ê¶¢ï¿½ì ¿??????backtester/results/*.json ???ï¿½ï¿½ï¿???????‘ï¿½???ï¿½ëœ®??
  // ?????ç­Œë¨²??§¥ï¿???ï¿½ë?ï¿½ëŠ¾??????°ï¿½?ï¿½ìº??? ?ï¿½ë„­?¨Îºë°???ï¦«ï¿½?ï¿½ëŒ†????????æºë‚‡ê¼????ï¿½ë«ï¿½ï¿½ï¿½ë²ê¼??? ???„ì…?»ï¿½???ç­Œë¤¾?“ï¿½???
  
  const equityData = [];
  const drawdownData = [];
  let currentEquity = 10000;
  let peak = 10000;
  
  const startDate = new Date('2024-01-01');
  
  for (let i = 0; i < 100; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    
    // ??ï¿½ë®†ï¿½ê¹“?????ï¿½ëª´?¨ë£¸??????„ì…?»ï¿½??(??ï¿½ë?ï§?ˆ????ï¿½ë«ï¿½ï¿½ï¿½êµ¥å½›ï¿½????????æºë‚‡ê¼??
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
