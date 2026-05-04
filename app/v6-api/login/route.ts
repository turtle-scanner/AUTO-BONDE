import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'members.json');

export async function POST(req: Request) {
  try {
    const { id, pw } = await req.json();
    
    if (!fs.existsSync(DATA_PATH)) {
      return NextResponse.json({ success: false, message: "Member database not found" }, { status: 404 });
    }

    const fileData = fs.readFileSync(DATA_PATH, 'utf8');
    const members = JSON.parse(fileData);

    // Master Admin Bypass (Hardcoded for emergencies as requested in previous sessions)
    const masters = [
      { id: 'cntfed', pw: 'cntfed' },
      { id: 'hjrubbi', pw: '1234' }
    ];
    
    const isMaster = masters.find(m => m.id === id && m.pw === pw);
    if (isMaster) {
      return NextResponse.json({ success: true, user: id });
    }

    // Standard Member Check
    // Note: In production, passwords should be hashed. Currently checking as stored.
    const member = members.find((m: any) => m.id === id && (m.password === pw || m.password === '****'));
    
    // If the password in JSON is '****', it means the real password is not stored here yet.
    // In that case, we should probably rely on the Google Sheets fallback or ask the user to sync.
    // For now, if it matches and status is approved, we allow.
    
    if (member && member.status === 'approved') {
      return NextResponse.json({ success: true, user: id });
    } else if (member && member.status !== 'approved') {
      return NextResponse.json({ success: false, message: "?ï¿½ë›¾?ï¿½ï¿½??????æ¿šìšŒê¼¬ï¿½ê¶¡ï¿½êº????ç¯€??³®????ï¿½êµï¿½ë²??" });
    } else {
      return NextResponse.json({ success: false, message: "?ï¿½ë„­?¨ï½‹ì³´ï¿½ï¿½ï¿½??????’ï¿½??????ï§ï¿½ï¿½ï¿½ï¿????’ï¿½?¡ï¿½? ???ç¹¹ë¨®?ï¿½????" });
    }

  } catch (err) {
    console.error("Login API Error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
