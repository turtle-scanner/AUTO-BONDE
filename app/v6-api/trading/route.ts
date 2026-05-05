import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Helper to get user-specific directory
const getUserDir = (username: string) => {
  const dir = path.join(process.cwd(), 'data', 'users', username);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
};

const isAdmin = (username: string) => {
  const masters = ['cntfed', 'hjrubbi'];
  return masters.includes(username);
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('user') || 'guest';
    const rootDir = path.resolve(process.cwd(), '..');
    
    // Global signals remain shared
    const signalsPath = path.join(rootDir, 'bonde_signals.json');
    const signals = fs.existsSync(signalsPath) 
      ? JSON.parse(fs.readFileSync(signalsPath, 'utf8')) 
      : { signals: [] };

    let positions = {};
    let orders = [];

    if (isAdmin(username)) {
      // Admin sees master bot data
      const positionsPath = path.join(rootDir, 'bonde_active_positions.json');
      const ordersPath = path.join(rootDir, 'bonde_pending_orders.json');
      
      positions = fs.existsSync(positionsPath) ? JSON.parse(fs.readFileSync(positionsPath, 'utf8')) : {};
      orders = fs.existsSync(ordersPath) ? JSON.parse(fs.readFileSync(ordersPath, 'utf8')) : [];
    } else {
      // Members see their own isolated data
      const userDir = getUserDir(username);
      const userPosPath = path.join(userDir, 'positions.json');
      const userOrdersPath = path.join(userDir, 'orders.json');

      positions = fs.existsSync(userPosPath) ? JSON.parse(fs.readFileSync(userPosPath, 'utf8')) : {};
      orders = fs.existsSync(userOrdersPath) ? JSON.parse(fs.readFileSync(userOrdersPath, 'utf8')) : [];
    }

    return NextResponse.json({
      positions,
      signals,
      orders,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("API Error (GET):", error);
    return NextResponse.json({ error: "Failed to fetch trading data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const orderData = await request.json();
    const { user: username } = orderData;
    const rootDir = path.resolve(process.cwd(), '..');

    let ordersPath;
    if (isAdmin(username)) {
      ordersPath = path.join(rootDir, 'bonde_pending_orders.json');
    } else {
      const userDir = getUserDir(username);
      ordersPath = path.join(userDir, 'orders.json');
    }

    // Load existing orders
    let orders = [];
    if (fs.existsSync(ordersPath)) {
      orders = JSON.parse(fs.readFileSync(ordersPath, 'utf8'));
    }

    // Add new order with metadata
    const newOrder = {
      ...orderData,
      id: `ord_${Date.now()}`,
      status: 'pending',
      created_at: new Date().toISOString()
    };

    orders.push(newOrder);
    fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2));

    return NextResponse.json({ success: true, order: newOrder });
  } catch (error) {
    console.error("API Error (POST):", error);
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
  }
}
