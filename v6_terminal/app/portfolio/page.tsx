import SectorPage from '@/components/SectorPage';
import { Shield } from 'lucide-react';
export default function PortfolioPage() {
  return <SectorPage sectionCode="4. RISK" title="전략 및 리스크 관리" description="포트폴리오 리스크 분석, 포지션 사이징, 손절/익절 전략을 체계적으로 관리합니다. 생존이 곧 승리입니다." icon={<Shield size={48} />} />;
}
