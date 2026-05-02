import SectorPage from '@/components/SectorPage';
import { Radio } from 'lucide-react';
export default function RadarPage() {
  return <SectorPage sectionCode="5-c. RADAR" title="나노바나나 레이더" description="소형주 급등 신호를 실시간으로 탐지하는 나노바나나 레이더 시스템입니다. 폭발 직전의 종목을 포착합니다." icon={<Radio size={48} />} />;
}
