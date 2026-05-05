import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'members.json');

export async function GET() {
  try {
    if (fs.existsSync(DATA_PATH)) {
      const fileData = fs.readFileSync(DATA_PATH, 'utf8');
      const members = JSON.parse(fileData);
      
      // Return the members for Admin view (passwords masked for security in list)
      const sanitizedMembers = members.map((m: any) => ({
        ...m,
        password: '****' 
      }));
      
      return NextResponse.json(sanitizedMembers);
    } else {
      return NextResponse.json([]);
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to load members" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const updatedMembers = await req.json();
    fs.writeFileSync(DATA_PATH, JSON.stringify(updatedMembers, null, 2));
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to save members" }, { status: 500 });
  }
}
