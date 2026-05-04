import SectorPage from '@/components/SectorPage';
import { Play } from 'lucide-react';
export default function ExecPage() {
  return <SectorPage sectionCode="7-a. EXEC" title="모의투자 매수 테스트" description="실전 진입 전 모의 투자로 전략을 검증합니다. 가상 자금으로 안전하게 매매 감각을 훈련합니다." icon={<Play size={48} />} />;
}
