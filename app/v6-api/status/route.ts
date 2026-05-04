import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const rootDir = path.resolve(process.cwd(), '..');
    const logPath = path.join(rootDir, 'bonde_bot_v3.log');

    let lastHeartbeat = "Unknown";
    let isLive = false;

    if (fs.existsSync(logPath)) {
      const stats = fs.statSync(logPath);
      const lastModified = stats.mtime;
      lastHeartbeat = lastModified.toLocaleString('ko-KR');
      
      // If the log was updated in the last 2 minutes, consider it live
      const diffMinutes = (new Date().getTime() - lastModified.getTime()) / 60000;
      isLive = diffMinutes < 2;
    }

    return NextResponse.json({
      status: isLive ? "LIVE" : "IDLE",
      lastHeartbeat,
      version: "v3.0 Advanced",
      engine: "Bonde Engine Platinum"
    });
  } catch (error) {
    return NextResponse.json({ status: "OFFLINE", lastHeartbeat: "N/A" });
  }
}
