import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const BALANCES_FILE = path.join(process.cwd(), 'data', 'mock_balances.json');

export async function GET() {
  try {
    if (!fs.existsSync(BALANCES_FILE)) return NextResponse.json([]);
    
    const balances = JSON.parse(fs.readFileSync(BALANCES_FILE, 'utf8'));
    const STARTING_BALANCE = 10000000;

    const ranking = Object.entries(balances).map(([user, balance]: [string, any]) => {
      const profitPct = ((balance - STARTING_BALANCE) / STARTING_BALANCE) * 100;
      return {
        name: user,
        balance,
        profitPct: profitPct.toFixed(2) + '%'
      };
    });

    // Sort by balance descending
    ranking.sort((a, b) => b.balance - a.balance);

    return NextResponse.json(ranking);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch ranking' }, { status: 500 });
  }
}
