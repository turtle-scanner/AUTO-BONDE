import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const rootDir = path.resolve(process.cwd(), '..');
    const scanPath = path.join(rootDir, 'bonde_scan_results.json');

    if (!fs.existsSync(scanPath)) {
      return NextResponse.json([]);
    }

    const data = JSON.parse(fs.readFileSync(scanPath, 'utf8'));
    return NextResponse.json(data);
  } catch (error) {
    console.error("Scan API Error:", error);
    return NextResponse.json({ error: "Failed to fetch scan results" }, { status: 500 });
  }
}
