import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Navigate up to the root directory from v6_terminal
    const rootDir = path.resolve(process.cwd(), '..');
    
    const positionsPath = path.join(rootDir, 'bonde_active_positions.json');
    const signalsPath = path.join(rootDir, 'bonde_signals.json');
    const ordersPath = path.join(rootDir, 'bonde_pending_orders.json');

    const positions = fs.existsSync(positionsPath) 
      ? JSON.parse(fs.readFileSync(positionsPath, 'utf8')) 
      : {};
    
    const signals = fs.existsSync(signalsPath) 
      ? JSON.parse(fs.readFileSync(signalsPath, 'utf8')) 
      : { signals: [] };

    const orders = fs.existsSync(ordersPath) 
      ? JSON.parse(fs.readFileSync(ordersPath, 'utf8')) 
      : [];

    return NextResponse.json({
      positions,
      signals,
      orders,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to fetch trading data" }, { status: 500 });
  }
}
