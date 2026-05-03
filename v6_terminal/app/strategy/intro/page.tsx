"use client";

import React from 'react';
import GlassCard from '@/components/GlassCard';
import { 
  Rocket, 
  PenTool, 
  ShieldCheck, 
  TrendingUp, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  Target
} from 'lucide-react';

export default function StrategyIntro() {
  return (
    <div className="strategy-container animate-fade-in">
      {/* 1. Commander's Letter Section */}
      <div className="letter-section">
        <GlassCard className="commander-letter-card">
          <div className="letter-header">
            <Target className="gold" size={32} />
            <h1>Dragonfly: 경제적 자유를 향한 비행, 그 시작의 기록</h1>
          </div>
          
          <div className="letter-body">
            <section className="letter-segment">
              <h3>🚀 누구에게나 열린 경제적 자유의 문을 믿으며</h3>
              <p>
                우리는 누구나 한 번쯤 '경제적 자유'를 꿈꿉니다. 하지만 주식 시장이라는 거대한 바다 앞에서 많은 이들이 방향을 잃고 좌절하곤 합니다. 
                저 역시 같은 고민을 품고 길을 찾아 헤맸습니다. 그러다 만난 위대한 거인들—윌리엄 오닐, 마크 미너비니, 스탠 와인스태인, 그리고 프라딥 본데—그들의 철학은 저에게 단순한 투자 기법 이상의 확신을 주었습니다.
              </p>
              <p className="emphasis">
                "올바른 방법으로 노력한다면, 누구나 돈을 벌어 스스로의 삶을 결정할 수 있는 자유를 누릴 수 있다."
              </p>
              <p>
                이 뜨거운 확신이 저를 움직이게 했고, 그 결과물이 바로 주식 공부 웹사이트 'Dragonfly'입니다.
              </p>
            </section>

            <section className="letter-segment">
              <h3>🛠️ 3주간의 고통, 그리고 '처음부터 다시'라는 용기</h3>
              <p>
                Dragonfly가 세상에 나오기까지 지난 3주는 제 인생에서 가장 밀도 높은 도전의 시간이었습니다. 코드가 꼬이고, 뜻대로 구현되지 않는 기능들 앞에서 수없이 무력감을 느꼈습니다. 
                때로는 밤을 지새우며 고민했고, 때로는 감당하기 힘든 고통에 포기하고 싶은 순간도 있었습니다.
              </p>
              <div className="callout">
                하지만 그때마다 저를 일으켜 세운 것은 "이 서비스가 누군가에게는 희망의 사다리가 될 수 있다"는 책임감이었습니다. 
                쌓아 올린 공든 탑을 무너뜨리고 '처음부터 다시' 시작하기를 반복했습니다. 그 고통스러운 인고의 시간을 거치며 Dragonfly는 더욱 단단해졌고, 비로소 여러분 앞에 설 수 있게 되었습니다.
              </div>
            </section>

            <section className="letter-segment">
              <h3>🇰🇷 한국의 '스탁비(Stockbee)'를 꿈꾸다</h3>
              <p>
                Dragonfly의 모토는 해외의 유명한 주식 커뮤니티인 스탁비(Stockbee)였습니다. 제 목표는 명확했습니다. 
                <strong>"대한민국의 투자자들이 언어의 장벽이나 정보의 비대칭성 없이, 국내에서도 자유롭고 무료로 최신 주식 정보와 소식을 접하게 하겠다"</strong>는 것입니다.
              </p>
              <p>
                돈을 내야만 얻을 수 있는 고급 정보가 아니라, 공부하고자 하는 의지만 있다면 누구나 평등하게 접근할 수 있는 지식의 창구를 만들고 싶었습니다.
              </p>
            </section>

            <section className="letter-segment">
              <h3>🔥 여러분에게 전하는 용기의 메시지</h3>
              <p>
                사랑하는 투자자 여러분, 그리고 경제적 자유를 꿈꾸는 도전자 여러분. 주식 공부는 결코 쉽지 않습니다. 
                제가 포기하지 않고 처음부터 다시 시작해 결국 Dragonfly를 완성해냈듯이, 여러분의 노력 또한 반드시 결실을 맺을 것입니다. 
                거인들이 증명했듯, 시장은 준비된 자에게 반드시 보답합니다.
              </p>
              <div className="dragonfly-meaning glass">
                <strong>Dragonfly(잠자리)</strong>는 물 위를 스치듯 가볍게 날지만, 사실 가장 정교한 비행 능력을 갖춘 곤충입니다. 
                여러분의 투자 여정도 Dragonfly와 함께 정교하고 자유로운 비행이 되기를 진심으로 기원합니다.
              </div>
              <p className="final-call">
                포기하지 마십시오. 공부하십시오. 그리고 반드시 자유로워지십시오.<br/>
                여러분의 그 위대한 여정에 Dragonfly가 끝까지 함께하겠습니다.
              </p>
            </section>
          </div>
        </GlassCard>
      </div>

      {/* 2. Strategy Tables Section */}
      <div className="strategy-tables-section">
        <div className="section-header-mini">
          <Zap className="gold" size={24} />
          <h2>Elite Trading Principles (핵심 전략 요약)</h2>
        </div>

        <div className="tables-grid">
          {/* CAN SLIM Table */}
          <GlassCard className="table-card">
            <h3>윌리엄 오닐의 CAN SLIM 원칙</h3>
            <div className="strategy-table-wrapper">
              <table className="strategy-table">
                <thead>
                  <tr>
                    <th>글자</th>
                    <th>의미</th>
                    <th>핵심 조건</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>C</td><td>Current Earnings</td><td>최근 분기 주당순이익(EPS) 25% 이상 성장</td></tr>
                  <tr><td>A</td><td>Annual Earnings</td><td>지난 3년간 연간 이익 25% 이상 지속 성장</td></tr>
                  <tr><td>N</td><td>New Factor</td><td>신제품, 신기술, 신규 관리자, 신고가 경신</td></tr>
                  <tr><td>S</td><td>Supply & Demand</td><td>발행 주식 수 대비 강력한 기관 매수 수요</td></tr>
                  <tr><td>L</td><td>Leader or Laggard</td><td>업종 내 주도주 여부 (Relative Strength 80 이상)</td></tr>
                  <tr><td>I</td><td>Institutional Sponsorship</td><td>우량 기관 투자자의 최근 매수세 유입</td></tr>
                  <tr><td>M</td><td>Market Direction</td><td>전체 시장의 추세 (상승장 확인 필수)</td></tr>
                </tbody>
              </table>
            </div>
          </GlassCard>

          {/* VCP Table */}
          <GlassCard className="table-card">
            <h3>마크 미너비니의 VCP 패턴</h3>
            <div className="strategy-table-wrapper">
              <table className="strategy-table">
                <thead>
                  <tr>
                    <th>단계</th>
                    <th>구분</th>
                    <th>특징 및 조건</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Stage 1</td><td>기저 형성</td><td>이전 상승폭의 25~50% 정도의 눌림목 형성</td></tr>
                  <tr><td>Stage 2</td><td>변동성 수축</td><td>고점 대비 하락폭이 점차 줄어듦 (V1 -> V2 -> V3)</td></tr>
                  <tr><td>Stage 3</td><td>거래량 급감</td><td>베이스의 오른쪽 끝에서 거래량이 마르며 대기 매물 소화</td></tr>
                  <tr><td>Stage 4</td><td>피벗 돌파</td><td>강력한 거래량과 함께 저항선을 뚫고 상승 가속화</td></tr>
                  <tr><td colSpan={2}>핵심 철학</td><td>손실은 최소화(-4~-7%), 수익은 추세 추종</td></tr>
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>
      </div>

      <style jsx>{`
        .strategy-container { padding: 40px; display: flex; flex-direction: column; gap: 60px; color: white; max-width: 1200px; margin: 0 auto; }
        
        /* Letter Style */
        .commander-letter-card { padding: 60px; background: rgba(10, 10, 15, 0.7); border: 1px solid rgba(212, 175, 55, 0.15); }
        .letter-header { border-bottom: 2px solid var(--primary); padding-bottom: 30px; margin-bottom: 40px; }
        .letter-header h1 { font-size: 1.8rem; font-weight: 900; margin: 10px 0 0 0; color: #f2f2f2; }
        
        .letter-body { display: flex; flex-direction: column; gap: 48px; }
        .letter-segment h3 { font-size: 1.25rem; font-weight: 800; color: var(--primary); margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
        .letter-segment p { font-size: 1rem; line-height: 1.9; color: #cbd5e1; margin-bottom: 16px; }
        .letter-segment strong { color: white; font-weight: 800; }
        
        .emphasis { font-size: 1.3rem !important; font-weight: 900; color: white !important; text-align: center; padding: 40px 0; background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.05), transparent); font-style: italic; }
        
        .callout { padding: 30px; background: rgba(212, 175, 55, 0.03); border-radius: 12px; border-left: 4px solid var(--primary); font-size: 1.05rem; line-height: 1.8; color: #e2e8f0; font-weight: 500; }
        
        .dragonfly-meaning { padding: 24px; margin: 30px 0; border: 1px dashed rgba(212, 175, 55, 0.3); border-radius: 12px; font-size: 0.95rem; color: #94a3b8; line-height: 1.7; }
        .dragonfly-meaning strong { color: var(--primary); font-size: 1.1rem; }
        
        .final-call { font-size: 1.4rem !important; font-weight: 900 !important; color: var(--primary) !important; text-align: center; margin-top: 20px; line-height: 1.5 !important; }

        /* Tables Style */
        .section-header-mini { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
        .section-header-mini h2 { font-size: 1.4rem; font-weight: 900; color: #f2f2f2; }
        
        .tables-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
        .table-card { padding: 24px; }
        .table-card h3 { font-size: 1.05rem; font-weight: 900; color: var(--primary); margin-bottom: 20px; }
        
        .strategy-table-wrapper { overflow-x: auto; }
        .strategy-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
        .strategy-table th { background: rgba(212, 175, 55, 0.1); color: var(--primary); text-align: left; padding: 12px; border-bottom: 1px solid rgba(212, 175, 55, 0.2); }
        .strategy-table td { padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #cbd5e1; }
        .strategy-table tr:hover { background: rgba(255,255,255,0.02); }

        .gold { color: #d4af37; }

        @media (max-width: 1024px) {
          .tables-grid { grid-template-columns: 1fr; }
          .commander-letter-card { padding: 30px; }
        }
      `}</style>
    </div>
  );
}
