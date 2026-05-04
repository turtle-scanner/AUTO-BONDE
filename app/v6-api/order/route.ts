import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, name, qty, reason } = body;

    if (!code || !name || !qty) {
      return NextResponse.json({ error: "Missing required fields (code, name, qty)" }, { status: 400 });
    }

    const rootDir = path.resolve(process.cwd(), '..');
    const pendingPath = path.join(rootDir, 'bonde_pending_orders.json');

    let currentPending: any = { pending_orders: [] };
    if (fs.existsSync(pendingPath)) {
      try {
        currentPending = JSON.parse(fs.readFileSync(pendingPath, 'utf8'));
      } catch (e) {
        currentPending = { pending_orders: [] };
      }
    }

    const newOrder = {
      code,
      name,
      qty: parseInt(qty),
      reason: reason || "Manual Web Order",
      timestamp: new Date().toISOString()
    };

    currentPending.pending_orders.push(newOrder);

    fs.writeFileSync(pendingPath, JSON.stringify(currentPending, null, 4));

    return NextResponse.json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Order API Error:", error);
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
  }
}
