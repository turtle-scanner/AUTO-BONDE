import { NextResponse } from 'next/server';

export async function GET() {
  // Nano Banana Radar: Stocks "Ripening" (Ready for Breakout)
  const data = {
    KOSPI: [
      { ticker: '??繹먭?��??�넭?�ｋ�??, ripeness: 85, status: '????議용�?�럾��??濚�?, price: '78,500', target: '82,000' },
      { ticker: '?�넭??��?, ripeness: 95, status: '?�넭?�ｋ�??????��?(??��?�벡�꺊!)', price: '245,000', target: '280,000' },
    ],
    KOSDAQ: [
      { ticker: '???筌�?�넭?�ｋ쳛鸚�???�떧?��?, ripeness: 40, status: '?縕�?袁〓뭄??(????', price: '225,000', target: '300,000' },
      { ticker: 'HPSP', ripeness: 98, status: '?�뛾?��????�눧誘⑷???�씈�읈???, price: '54,200', target: '65,000' },
    ],
    NASDAQ: [
      { ticker: 'NVDA', ripeness: 99, status: '??�뙴�궠�빐 ?袁⑸�?��???, price: '$912.40', target: '$1,100' },
      { ticker: 'TSLA', ripeness: 20, status: '??? ?��?(???��?�럢??', price: '$175.20', target: '$250' },
    ]
  };

  return NextResponse.json(data);
}
