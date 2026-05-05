import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const TRADES_FILE = path.join(DATA_DIR, 'mock_trades.json');
const BALANCES_FILE = path.join(DATA_DIR, 'mock_balances.json');

// Ensure data directory and files exist
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
if (!fs.existsSync(TRADES_FILE)) fs.writeFileSync(TRADES_FILE, '[]');
if (!fs.existsSync(BALANCES_FILE)) fs.writeFileSync(BALANCES_FILE, '{}');

const STARTING_BALANCE = 10000000;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const user = searchParams.get('user') || 'Guest';

  const balances = JSON.parse(fs.readFileSync(BALANCES_FILE, 'utf8'));
  const trades = JSON.parse(fs.readFileSync(TRADES_FILE, 'utf8'));

  const userBalance = balances[user] || STARTING_BALANCE;
  const userTrades = trades.filter((t: any) => t.user === user);

  return NextResponse.json({ balance: userBalance, trades: userTrades });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { user, ticker, market, price, qty, type } = body;

    if (!user || !ticker || !price || !qty) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const balances = JSON.parse(fs.readFileSync(BALANCES_FILE, 'utf8'));
    const trades = JSON.parse(fs.readFileSync(TRADES_FILE, 'utf8'));

    const currentBalance = balances[user] || STARTING_BALANCE;
    const orderCost = price * qty * (market === 'US' ? 1400 : 1);

    if (type === 'BUY') {
      if (currentBalance < orderCost) {
        return NextResponse.json({ error: '???‰ë¨¯? ç­Œï¿???ï¿½ê±¡?ºë–·ï¿??‰ëš°ï¿½ï¿½?è½…ë??????ï¿½ëœ„ï¿½ë ¡.' }, { status: 400 });
      }
      balances[user] = currentBalance - orderCost;
    } else {
      // For SELL, we should check if they own it. For now, we'll just add to balance.
      balances[user] = currentBalance + orderCost;
    }

    const newTrade = {
      id: Date.now().toString(),
      user,
      ticker,
      market,
      price,
      qty,
      type,
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date().toISOString()
    };

    trades.push(newTrade);

    fs.writeFileSync(BALANCES_FILE, JSON.stringify(balances, null, 2));
    fs.writeFileSync(TRADES_FILE, JSON.stringify(trades, null, 2));

    return NextResponse.json({ trade: newTrade, newBalance: balances[user] });
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
