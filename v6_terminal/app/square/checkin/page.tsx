import SectorPage from '@/components/SectorPage';
import { CheckCircle } from 'lucide-react';
export default function CheckinPage() {
  return <SectorPage sectionCode="6-a. CHECK" title="출석체크 (오늘 한 줄)" description="매일 출석하며 오늘의 시장 한 줄 평을 남깁니다. 꾸준함이 곧 실력입니다." icon={<CheckCircle size={48} />} />;
}
