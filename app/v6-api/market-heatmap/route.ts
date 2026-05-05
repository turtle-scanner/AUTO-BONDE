import { NextResponse } from 'next/server';

export async function GET() {
  // Sector performance data for US and KR markets
  const data = {
    US: [
      { 
        name: 'TECHNOLOGY', 
        stocks: [
          { ticker: 'NVDA', change: 4.85, cap: 'Large' },
          { ticker: 'MSFT', change: 1.25, cap: 'Large' },
          { ticker: 'AAPL', change: -0.45, cap: 'Large' },
          { ticker: 'GOOGL', change: 0.88, cap: 'Medium' },
          { ticker: 'META', change: 2.34, cap: 'Medium' },
          { ticker: 'AMZN', change: 1.12, cap: 'Medium' },
        ]
      },
      { 
        name: 'SEMICONDUCTORS', 
        stocks: [
          { ticker: 'AMD', change: 3.56, cap: 'Large' },
          { ticker: 'AVGO', change: 2.12, cap: 'Medium' },
          { ticker: 'ARM', change: 8.45, cap: 'Medium' },
          { ticker: 'MU', change: 5.21, cap: 'Small' },
          { ticker: 'ASML', change: 1.78, cap: 'Small' },
        ]
      },
      { 
        name: 'ENERGY & AUTO', 
        stocks: [
          { ticker: 'TSLA', change: -3.82, cap: 'Large' },
          { ticker: 'XOM', change: 1.45, cap: 'Medium' },
          { ticker: 'CVX', change: 0.88, cap: 'Medium' },
          { ticker: 'RIVN', change: -5.67, cap: 'Small' },
        ]
      }
    ],
    KR: [
      { 
        name: '?è¢â‘¸ì¦µï¿½ëª?¿½?£ï¿½?€?¬ê³ê³·ì?, 
        stocks: [
          { ticker: '??ç¹¹ë¨­?”ï¿½??ï¿½ë„­?¨ï½‹ì³??, change: 1.56, cap: 'Large' },
          { ticker: 'SK??ï¿½ëª´?¨ë£»ê¼??ç¹¹ë¨®êµï§¥ï¿?, change: 3.82, cap: 'Large' },
          { ticker: '????è¢â‘¸ì¦µï¿½ëª?¿½?£ï¿½?€?¬ê³ê³·ì?, change: 5.67, cap: 'Medium' },
          { ticker: 'HPSP', change: 4.12, cap: 'Small' },
          { ticker: '??ï¿½ï¿½?¤ï¼˜??¿½?????ç­Œï¿½?ï§¥ï¿½', change: 7.21, cap: 'Small' },
        ]
      },
      { 
        name: '??ï¿½ï¿½?¤ë˜»??¿½?ï¿½ë„­?', 
        stocks: [
          { ticker: '???ç­Œï¿½?ï¿½ë„­?¨ï½‹ì³›é¸šï¿?, change: -4.56, cap: 'Large' },
          { ticker: '???ç­Œï¿½?ï¿½ë„­?¨ï½‹ì³›é¸šï¿???ï¿½ë–§?´ï¿½?, change: -3.88, cap: 'Medium' },
          { ticker: 'LG?????’ã‚Œ???‰ì˜¨ï¿???‰ë¨®????, change: -1.25, cap: 'Medium' },
          { ticker: 'POSCO?????„ì…ì±¶ï§¥ï¿?, change: -2.34, cap: 'Small' },
        ]
      },
      { 
        name: '?è¢â‘¸ì¦????& ??????, 
        stocks: [
          { ticker: '??ï¿½ï¿½?¤ë¬œï¿½ï¿½???æºë†ì£?, change: 2.45, cap: 'Large' },
          { ticker: '???ï¦«ëš®?éŠ?”ê±¡??, change: 1.12, cap: 'Medium' },
          { ticker: 'NAVER', change: -0.88, cap: 'Medium' },
          { ticker: '??¨ë©¸??ï¿½ê¶˜ï§ï¿½??, change: -1.21, cap: 'Small' },
        ]
      }
    ]
  };

  return NextResponse.json(data);
}
