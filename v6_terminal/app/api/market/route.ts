import { NextResponse } from 'next/server';

export async function GET() {
  // In a real scenario, this would call the Python FastAPI backend
  // For now, we return mock data that matches the UI
  const marketData = {
    kospi: { price: "2,750.32", change: "+1.2%", status: "up" },
    nasdaq: { price: "16,428.82", change: "+0.8%", status: "up" },
    usdKrw: { price: "1,345.20", change: "-0.3%", status: "down" },
  };

  return NextResponse.json(marketData);
}
