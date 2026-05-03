"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const EXAM_QUESTIONS = [
  { q: "마크 미너비니의 추세 템플릿(Trend Template)에서 현재 주가는 몇 주 이동평균선 위에 있어야 하는가?", options: ["30주", "40주", "50주", "20주"], answer: 1 },
  { q: "VCP(Volatility Contraction Pattern)에서 가장 중요한 신호는?", options: ["거래량 폭발과 함께 저항선 돌파", "이동평균선 골든크로스", "RSI 70 이상", "MACD 상향 전환"], answer: 0 },
  { q: "EP(Episodic Pivot)란 무엇인가?", options: ["장기 박스권 돌파", "예상치 못한 기업 이벤트로 인한 급등 돌파", "실적 발표 후 갭하락", "52주 신저가 이탈"], answer: 1 },
  { q: "미너비니의 SEPA 전략에서 A는 무엇의 약자인가?", options: ["Annual Report", "Acceleration", "Average Volume", "Asset Quality"], answer: 1 },
  { q: "본데 전략에서 '주도주'를 판단하는 가장 핵심 기준은?", options: ["PER이 낮을수록", "RS 강도가 시장 대비 우위", "배당 수익률", "시가총액 규모"], answer: 1 },
  { q: "리스크 관리에서 '1R'이란?", options: ["1% 수익률", "1회 매수 금액", "진입가 - 손절가", "목표가 - 진입가"], answer: 2 },
  { q: "윌리엄 오닐의 CAN SLIM에서 'C'가 의미하는 것은?", options: ["Cash Flow", "Current Quarterly Earnings", "Competitive Advantage", "Capital Allocation"], answer: 1 },
  { q: "주도주의 최적 매수 타이밍은?", options: ["52주 신고가 돌파 직후", "50% 이상 하락 후 반등", "장 시작 직후 무조건 매수", "이동평균선 하향 이탈"], answer: 0 },
  { q: "VCP 패턴에서 수축(Contraction)이란?", options: ["주가 하락", "변동성이 줄어들며 주가가 타이트해지는 현상", "거래량 급증", "이동평균선 수렴"], answer: 1 },
  { q: "올바른 손절 원칙은?", options: ["손실이 커질 때까지 기다린다", "진입 전 손절가를 미리 설정하고 기계적으로 실행", "뉴스를 보고 판단", "물타기로 단가 낮추기"], answer: 1 },
  { q: "RS(Relative Strength)가 높은 종목이란?", options: ["주가 절대값이 높은 종목", "시장 대비 수익률이 우수한 종목", "RSI 지표가 높은 종목", "배당이 높은 종목"], answer: 1 },
  { q: "미너비니의 '슈퍼퍼포먼스' 종목의 특징이 아닌 것은?", options: ["52주 신고가 부근", "강한 실적 성장", "낮은 거래량", "강한 RS 강도"], answer: 2 },
  { q: "기관 투자자의 매집 신호는?", options: ["거래량이 평균의 150% 이상이면서 주가 상승", "거래량 감소와 주가 하락", "PER 하락", "배당 지급"], answer: 0 },
  { q: "손익비(Risk/Reward Ratio)가 1:3 이라는 의미는?", options: ["손실 3, 수익 1", "손실 1, 수익 3", "손실 1%, 수익 3%", "3번 이익, 1번 손실"], answer: 1 },
  { q: "주도주의 추세 방향은?", options: ["하락 추세에서 매수", "횡보 구간에서 분할매수", "상승 추세 지속 중 적정 타점에서 매수", "무조건 저가 매수"], answer: 2 },
  { q: "'컵 앤 핸들(Cup and Handle)' 패턴에서 매수 시점은?", options: ["컵의 바닥", "핸들 형성 후 핸들 고점 돌파 시", "컵의 왼쪽 상단", "아무 때나"], answer: 1 },
  { q: "주도주 스캔 시 우선 제외해야 할 종목은?", options: ["RS 90 이상", "시장 대비 상대 강도 약세 종목", "52주 신고가 근처", "실적 성장 종목"], answer: 1 },
  { q: "본데가 강조하는 '망설임 없는 매수'의 조건은?", options: ["뉴스가 좋을 때", "VCP+거래량 폭발+RS강세 모든 조건 충족 시", "주가가 많이 떨어졌을 때", "지인 추천"], answer: 1 },
  { q: "미너비니의 '7-8% 손절 원칙'이 뜻하는 것은?", options: ["7-8% 수익 시 매도", "7-8% 손실 시 무조건 손절", "7-8% 상승 후 추가 매수", "전체 자산의 7-8% 투자"], answer: 1 },
  { q: "주식 시장에서 '52주 신고가'의 의미는?", options: ["최근 1년 중 가장 낮은 가격", "최근 1년 중 가장 높은 가격 돌파", "52주 평균 가격", "52주 전 주가"], answer: 1 },
  { q: "거래량이 주가 분석에서 중요한 이유는?", options: ["거래량이 많으면 항상 상승", "기관의 진짜 매수세를 확인할 수 있어서", "HTS에 표시되기 때문", "관계 없음"], answer: 1 },
  { q: "추세 추종(Trend Following) 전략의 핵심은?", options: ["역추세 매매", "추세가 살아있는 동안 유지하고 추세 이탈 시 정리", "매일 매수매도 반복", "장기 보유 무조건"], answer: 1 },
  { q: "분산투자와 집중투자 중 본데의 관점은?", options: ["100개 종목 분산", "검증된 소수 종목에 집중 투자", "ETF만 투자", "무조건 분산"], answer: 1 },
  { q: "EP(Episodic Pivot)의 가장 좋은 진입 타이밍은?", options: ["이벤트 발생 3개월 후", "이벤트 당일 또는 그 직후 강한 거래량 확인 시", "주가 50% 상승 후", "아무 때나"], answer: 1 },
  { q: "포지션 사이징(Position Sizing)이 중요한 이유는?", options: ["더 많이 살수록 수익이 크기 때문", "리스크를 일정하게 통제하기 위해", "증권사 수수료 절약", "세금 절약"], answer: 1 },
  { q: "본데 전략에서 '자격 없는 종목'이란?", options: ["RS 강도가 높은 종목", "시장 평균을 하회하며 추세가 꺾인 종목", "신고가 돌파 종목", "거래량 폭발 종목"], answer: 1 },
  { q: "SEPA 전략에서 '진입 포인트'의 기준은?", options: ["52주 저가 근처", "VCP 등 정형화된 패턴의 피벗 포인트 돌파", "이동평균선 하향 이탈", "PER 10배 이하"], answer: 1 },
  { q: "본데에서 '홀딩 원칙'이란?", options: ["무조건 1년 보유", "추세가 살아있고 손절선을 이탈하지 않는 한 유지", "10% 수익 시 무조건 매도", "뉴스 나오면 매도"], answer: 1 },
  { q: "스윙 트레이딩의 평균 보유 기간은?", options: ["수 분~수 시간", "수 일~수 주", "수 년", "10년 이상"], answer: 1 },
];

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'signup' | 'exam'>('login');
  const [formData, setFormData] = useState({ id: '', pw: '', name: '', region: '', age: '', gender: '', experience: '', goal: '' });
  const [examAnswers, setExamAnswers] = useState<number[]>(new Array(30).fill(-1));
  const [examDone, setExamDone] = useState(false);
  const [examScore, setExamScore] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [loginError, setLoginError] = useState('');
  const [timeLeft, setTimeLeft] = useState(900); // 15분 (900초)

  // Timer logic
  useEffect(() => {
    if (mode === 'exam' && !examDone && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            submitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [mode, examDone, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const SHEET_ID = '1xjbe9SF0HsxwY_Uy3NC2tT92BqK0nhArUaYU16Q0p9M';

  const handleLogin = async () => {
    setLoginError('');
    if (!formData.id || !formData.pw) { setLoginError('아이디와 비밀번호를 입력해주세요.'); return; }

    // Master Admin Bypass
    const masters = [
      { id: 'cntfed', pw: 'cntfed' },
      { id: 'hjrubbi', pw: '1234' }
    ];
    const isMaster = masters.find(m => m.id === formData.id && m.pw === formData.pw);
    if (isMaster) {
      sessionStorage.setItem('dragonfly_user', formData.id);
      router.push('/');
      return;
    }

    try {
      const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=1499398020`;
      const res = await fetch(url);
      const text = await res.text();
      const json = JSON.parse(text.substring(47, text.length - 2));
      const rows = json.table.rows;
      const found = rows.find((r: any) => {
        const id = r.c[0]?.v;
        const pw = r.c[1]?.v;
        const status = r.c[2]?.v;
        return id === formData.id && String(pw) === formData.pw && status === 'approved';
      });
      if (found) {
        sessionStorage.setItem('dragonfly_user', formData.id);
        router.push('/');
      } else {
        setLoginError('아이디/비밀번호가 틀리거나 승인 대기 중입니다.');
      }
    } catch {
      setLoginError('서버 연결 오류. 잠시 후 다시 시도해주세요.');
    }
  };

  const handleAnswer = (answerIdx: number) => {
    const newAnswers = [...examAnswers];
    newAnswers[currentQ] = answerIdx;
    setExamAnswers(newAnswers);
  };

  const submitExam = () => {
    let score = 0;
    EXAM_QUESTIONS.forEach((q, i) => { if (examAnswers[i] === q.answer) score++; });
    setExamScore(score);
    setExamDone(true);
  };

  const submitSignup = async () => {
    if (!formData.id || !formData.pw || !formData.name) { alert('필수 정보를 입력해주세요.'); return; }
    alert(`자격심사 신청이 완료되었습니다!\n\n아이디: ${formData.id}\n이름: ${formData.name}\n\n사령관의 승인 후 입장 가능합니다. 텔레그램으로 연락 주세요.`);
    setMode('login');
  };

  if (mode === 'exam') {
    if (examDone) {
      const passed = examScore >= 25;
      return (
        <div style={styles.overlay}>
          <div style={styles.card}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>{passed ? '🏆' : '😢'}</div>
            <h2 style={{ ...styles.title, color: passed ? '#d4af37' : '#ef4444' }}>
              {passed ? '[ MISSION COMPLETE ]' : '[ MISSION FAILED ]'}
            </h2>
            <p style={{ color: '#aaa', margin: '15px 0' }}>
              총 30문제 중 <strong style={{ color: '#fff' }}>{examScore}문제</strong> 정답
            </p>
            {passed ? (
              <>
                <p style={{ color: '#10b981', marginBottom: '20px' }}>합격! 이제 회원정보를 입력해주세요.</p>
                <button style={styles.primaryBtn} onClick={() => setMode('signup')}>회원 정보 입력 →</button>
              </>
            ) : (
              <>
                <p style={{ color: '#888', marginBottom: '20px' }}>25문제 이상 맞춰야 합격입니다. (부족: {25 - examScore}문제)</p>
                <button style={styles.secondaryBtn} onClick={() => { setExamDone(false); setExamAnswers(new Array(30).fill(-1)); setCurrentQ(0); setTimeLeft(900); }}>다시 도전</button>
              </>
            )}
          </div>
        </div>
      );
    }
    const q = EXAM_QUESTIONS[currentQ];
    return (
      <div style={styles.overlay}>
        <div style={{ ...styles.card, maxWidth: '600px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ textAlign: 'left' }}>
              <span style={{ color: '#d4af37', fontFamily: 'Orbitron', display: 'block', fontSize: '0.8rem' }}>[ 자격심사 ]</span>
              <span style={{ color: timeLeft < 60 ? '#ef4444' : '#fff', fontSize: '1.2rem', fontWeight: 900 }}>{formatTime(timeLeft)}</span>
            </div>
            <span style={{ color: '#888' }}>{currentQ + 1} / {EXAM_QUESTIONS.length}</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
            <p style={{ color: '#fff', fontSize: '1rem', lineHeight: '1.6' }}>{q.q}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '25px' }}>
            {q.options.map((opt, i) => (
              <button key={i} onClick={() => handleAnswer(i)}
                style={{ ...styles.optionBtn, background: examAnswers[currentQ] === i ? 'rgba(212,175,55,0.3)' : 'rgba(255,255,255,0.05)', borderColor: examAnswers[currentQ] === i ? '#d4af37' : 'rgba(255,255,255,0.1)' }}>
                <span style={{ color: '#d4af37', marginRight: '10px' }}>{['①', '②', '③', '④'][i]}</span> {opt}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
            <button style={styles.secondaryBtn} onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} disabled={currentQ === 0}>◀ 이전</button>
            {currentQ < EXAM_QUESTIONS.length - 1
              ? <button style={styles.primaryBtn} onClick={() => setCurrentQ(currentQ + 1)}>다음 ▶</button>
              : <button style={styles.primaryBtn} onClick={submitExam}>최종 제출</button>
            }
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '20px' }}>
            {EXAM_QUESTIONS.map((_, i) => (
              <div key={i} onClick={() => setCurrentQ(i)} style={{ width: '24px', height: '24px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: examAnswers[i] !== -1 ? '#d4af37' : i === currentQ ? 'rgba(212,175,55,0.3)' : 'rgba(255,255,255,0.1)', color: examAnswers[i] !== -1 ? '#000' : '#fff' }}>{i + 1}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'signup') {
    return (
      <div style={styles.overlay}>
        <div style={{ ...styles.card, maxWidth: '500px' }}>
          <h2 style={styles.title}>[ 대원 등록 신청 ]</h2>
          <p style={{ color: '#888', marginBottom: '20px', fontSize: '0.85rem' }}>모든 정보는 사령관 승인 후 반영됩니다.</p>
          {[
            { key: 'id', label: '아이디 *', placeholder: '사용할 아이디' },
            { key: 'pw', label: '비밀번호 *', placeholder: '비밀번호', type: 'password' },
            { key: 'name', label: '이름(닉네임) *', placeholder: '본명 또는 닉네임' },
            { key: 'region', label: '거주 지역', placeholder: '서울, 경기, 부산...' },
            { key: 'age', label: '연령대', placeholder: '20대, 30대, 40대...' },
            { key: 'experience', label: '투자 경력', placeholder: '1년 미만, 1-3년...' },
            { key: 'goal', label: '가입 목적', placeholder: '경제적 자유, 공부 등' },
          ].map(field => (
            <div key={field.key} style={{ marginBottom: '12px' }}>
              <label style={{ color: '#d4af37', fontSize: '0.8rem', display: 'block', marginBottom: '4px' }}>{field.label}</label>
              <input type={field.type || 'text'} placeholder={field.placeholder}
                onChange={e => setFormData(p => ({ ...p, [field.key]: e.target.value }))}
                style={styles.input} />
            </div>
          ))}
          <button style={styles.primaryBtn} onClick={submitSignup}>승인 신청 제출</button>
          <button style={{ ...styles.secondaryBtn, marginTop: '10px' }} onClick={() => setMode('login')}>← 로그인으로</button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <div style={{ marginBottom: '10px' }}>
          <span style={{ fontFamily: 'Orbitron', color: '#d4af37', fontSize: '0.7rem', letterSpacing: '3px' }}>STOCKDRAGONFLY v6.0</span>
        </div>
        <h1 style={styles.title}>[ SECURE ACCESS ]</h1>
        <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '30px' }}>사령부 출입 보안 인증 시스템</p>
        <div style={{ marginBottom: '15px' }}>
          <input type="text" placeholder="아이디" value={formData.id}
            onChange={e => setFormData(p => ({ ...p, id: e.target.value }))}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={styles.input} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <input type="password" placeholder="비밀번호" value={formData.pw}
            onChange={e => setFormData(p => ({ ...p, pw: e.target.value }))}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={styles.input} />
        </div>
        {loginError && <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '15px' }}>{loginError}</p>}
        <button style={styles.primaryBtn} onClick={handleLogin}>ENTER TERMINAL →</button>
        <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
          <button style={styles.secondaryBtn} onClick={() => setMode('exam')}>
            📋 자격심사 (회원가입)
          </button>
        </div>
        <p style={{ color: '#444', fontSize: '0.75rem', marginTop: '20px' }}>
          ⚠ 승인된 대원만 입장 가능합니다
        </p>
      </div>
    </div>
  );
}


const styles: Record<string, React.CSSProperties> = {
  overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: '#05070a', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, fontFamily: 'Inter, sans-serif' },
  card: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '16px', padding: '40px', width: '100%', maxWidth: '440px', textAlign: 'center', boxShadow: '0 0 60px rgba(212,175,55,0.05)' },
  title: { fontFamily: 'Orbitron, sans-serif', fontSize: '1.4rem', fontWeight: 900, color: '#fff', marginBottom: '10px' },
  input: { width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' },
  primaryBtn: { width: '100%', padding: '14px', background: 'linear-gradient(135deg, #d4af37, #f9d976)', color: '#000', border: 'none', borderRadius: '10px', fontWeight: 900, fontSize: '1rem', cursor: 'pointer', fontFamily: 'Orbitron, sans-serif', letterSpacing: '1px' },
  secondaryBtn: { width: '100%', padding: '12px', background: 'transparent', color: '#d4af37', border: '1px solid rgba(212,175,55,0.4)', borderRadius: '10px', cursor: 'pointer', fontSize: '0.9rem' },
  optionBtn: { padding: '12px 16px', border: '1px solid', borderRadius: '8px', color: '#fff', cursor: 'pointer', textAlign: 'left', fontSize: '0.9rem', transition: 'all 0.2s' },
};
