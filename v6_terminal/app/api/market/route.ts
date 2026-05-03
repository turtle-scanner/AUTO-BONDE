import { NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';

export async function GET() {
  try {
    // Yahoo Finance Symbols
    const symbols = {
      kospi: '^KS11',
      kosdaq: '^KQ11',
      nasdaq: '^IXIC',
      sp500: '^GSPC',
      dow: '^DJI',
      exchange: 'KRW=X' // USD/KRW
    };

    const results = await Promise.all(
      Object.entries(symbols).map(async ([key, symbol]) => {
        try {
          const quote = await yahooFinance.quote(symbol);
          return [key, {
            val: quote.regularMarketPrice,
            change: `${quote.regularMarketChangePercent?.toFixed(2)}%`,
            trend: (quote.regularMarketChangePercent || 0) >= 0 ? 'up' : 'down'
          }];
        } catch (err) {
          console.error(`Error fetching ${symbol}:`, err);
          return [key, null];
        }
      })
    );

    const data = Object.fromEntries(results.filter(([_, v]) => v !== null));

    return NextResponse.json(data);
  } catch (error) {
    console.error('Market API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch market data' }, { status: 500 });
  }
}
