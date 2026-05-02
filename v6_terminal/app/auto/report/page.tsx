import SectorPage from '@/components/SectorPage';
import { FileText } from 'lucide-react';
export default function ReportPage() {
  return <SectorPage sectionCode="7-d. REPORT" title="자동투자 성적표" description="AI 자동매매 엔진의 실전 매매 기록과 수익률을 투명하게 공개합니다. 데이터가 곧 신뢰입니다." icon={<FileText size={48} />} />;
}
