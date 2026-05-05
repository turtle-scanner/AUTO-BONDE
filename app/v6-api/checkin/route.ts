import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'checkins.json');

// Ensure the directory and file exist
if (!fs.existsSync(path.dirname(DB_PATH))) {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
}
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
}

export async function GET() {
  try {
    const fileData = fs.readFileSync(DB_PATH, 'utf8');
    const checkins = JSON.parse(fileData);
    return NextResponse.json(checkins);
  } catch (error) {
    console.error("API Error (GET):", error);
    return NextResponse.json({ error: "Failed to load checkins" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { username, comment } = await request.json();

    if (!username || !comment) {
      return NextResponse.json({ error: "Username and comment are required" }, { status: 400 });
    }

    const fileData = fs.readFileSync(DB_PATH, 'utf8');
    const checkins = JSON.parse(fileData);

    const newCheckin = {
      id: Date.now(),
      username,
      comment,
      date: new Date().toISOString()
    };

    checkins.unshift(newCheckin); // Add to the beginning

    // Keep only last 50 checkins for performance if needed, but the user said "keep them", so I'll keep all for now.
    fs.writeFileSync(DB_PATH, JSON.stringify(checkins, null, 2));

    return NextResponse.json(newCheckin);
  } catch (error) {
    console.error("API Error (POST):", error);
    return NextResponse.json({ error: "Failed to save checkin" }, { status: 500 });
  }
}
