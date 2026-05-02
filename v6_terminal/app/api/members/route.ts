import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // 프로젝트 루트의 users_db.json 경로 (실제 파일 위치에 맞게 조정)
    // Next.js 빌드 시점과 실행 시점의 경로를 고려하여 절대 경로 또는 프로젝트 루트 기준으로 설정
    const dbPath = path.join(process.cwd(), '..', 'users_db.json');
    
    if (fs.existsSync(dbPath)) {
      const fileData = fs.readFileSync(dbPath, 'utf8');
      const users = JSON.parse(fileData);
      
      // Admin 페이지에서 기대하는 Member 인터페이스 형식으로 변환
      const members = Object.keys(users).map(id => ({
        id: id,
        rank: users[id].rank || '회원',
        location: users[id].location || '-',
        experience: users[id].experience || '-',
        age: users[id].age || '-',
        motivation: users[id].motivation || '-',
        joined_at: users[id].joined_at || '-'
      }));
      
      return NextResponse.json(members);
    } else {
      // 파일이 없을 경우 기본 데이터 반환 (Admin 페이지의 Fallback과 유사)
      return NextResponse.json([]);
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to load members" }, { status: 500 });
  }
}
