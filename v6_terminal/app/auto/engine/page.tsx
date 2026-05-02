import SectorPage from '@/components/SectorPage';
import { Settings } from 'lucide-react';
export default function EnginePage() {
  return <SectorPage sectionCode="7-c. ENGINE" title="자동매매 전략엔진" description="본데/미너비니 전략 기반의 AI 자동매매 엔진을 설정하고 모니터링합니다. 24/7 무중단 교전 체제입니다." icon={<Settings size={48} />} />;
}
