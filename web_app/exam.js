
const poolBasic = [
  { q: "주식 시장에서 '상장폐지'를 의미하는 것은?", options: ["주식이 더 이상 거래소에서 거래되지 않음", "주식이 상한가를 기록함", "배당금이 지급됨", "액면분할이 이루어짐"], a: 0 },
  { q: "EPS(주당순이익)의 올바른 설명은?", options: ["기업의 순이익을 총 발행 주식수로 나눈 값", "주가를 순이익으로 나눈 값", "주당 배당금의 비율", "기업의 총 부채를 주식수로 나눈 값"], a: 0 },
  { q: "PER(주가수익비율)이 낮다는 것은 일반적으로 무엇을 의미하는가?", options: ["주가가 기업의 이익에 비해 저평가되어 있을 가능성이 높다", "주가가 고평가되어 있다", "회사의 성장이 매우 빠르다", "배당률이 높다"], a: 0 },
  { q: "다음 중 증거금(Margin) 거래의 가장 큰 위험성은?", options: ["원금 이상의 손실이 발생할 수 있다 (반대매매)", "수수료가 저렴하다", "환율 변동에만 영향을 받는다", "세금이 면제된다"], a: 0 },
  { q: "배당락(Ex-dividend)일의 의미는?", options: ["해당 일부터 주식을 매수해도 배당을 받을 권리가 없음", "배당금이 계좌에 입금되는 날", "배당을 받을 수 있는 마지막 날", "주식이 상장되는 날"], a: 0 },
  { q: "ETF(상장지수펀드)의 특징이 아닌 것은?", options: ["개별 주식처럼 실시간으로 매매할 수 없다", "분산 투자 효과가 있다", "주가지수 등 특정 지수의 수익률을 추종한다", "운용 수수료가 일반 펀드보다 대체로 저렴하다"], a: 0 },
  { q: "코스피(KOSPI) 지수는 무엇을 기준으로 산출되는가?", options: ["시가총액", "거래량", "매출액", "주가 평균"], a: 0 },
  { q: "서킷브레이커(Circuit Breaker)가 발동되는 이유는?", options: ["시장의 비이성적인 급락을 막고 투자자에게 냉정할 시간을 주기 위해", "주가가 상한가에 도달했을 때 거래를 촉진하기 위해", "외국인 투자를 장려하기 위해", "상장폐지를 결정하기 위해"], a: 0 },
  { q: "가치투자의 창시자로 불리며 워런 버핏의 스승인 인물은?", options: ["벤저민 그레이엄", "조지 소로스", "피터 린치", "제시 리버모어"], a: 0 },
  { q: "ROE(자기자본이익률)를 구하는 공식은?", options: ["(당기순이익 / 평균 자기자본) × 100", "(영업이익 / 총부채) × 100", "(당기순이익 / 총자산) × 100", "(주당순이익 / 주가) × 100"], a: 0 },
  { q: "공매도(Short Selling)에 대한 설명으로 옳은 것은?", options: ["주가 하락이 예상될 때 주식을 빌려서 팔고 나중에 갚는 전략", "주식을 장기 보유하여 배당을 받는 전략", "회사의 경영권을 방어하기 위한 전략", "새로 발행되는 주식을 먼저 배정받는 권리"], a: 0 },
  { q: "스캘핑(Scalping) 매매 기법의 주요 특징은?", options: ["초 단위, 분 단위의 짧은 시간 동안 잦은 매매로 틱 단위 수익을 챙김", "가치투자를 기반으로 10년 이상 장기 보유", "배당락일 하루 전 매수하여 다음 날 매도", "기업의 재무제표만을 분석하여 매매"], a: 0 },
  { q: "유상증자를 실시하면 일반적으로 단기 주가에 어떤 영향을 미치는가?", options: ["유통 주식수 증가로 인한 가치 희석으로 악재로 작용할 가능성이 크다", "주식수가 줄어들어 무조건 호재로 작용한다", "배당금이 늘어난다", "아무런 영향이 없다"], a: 0 },
  { q: "이동평균선 중 '데드크로스(Dead Cross)'가 의미하는 것은?", options: ["단기 이동평균선이 장기 이동평균선을 하향 돌파하는 현상", "단기 이동평균선이 장기 이동평균선을 상향 돌파하는 현상", "주가가 52주 신저가를 갱신하는 현상", "거래량이 급감하는 현상"], a: 0 },
  { q: "주식 분할(Stock Split)을 하는 주된 이유는?", options: ["1주당 가격을 낮춰 소액 투자자의 접근성을 높이고 거래를 활성화하기 위해", "회사의 자본금을 늘리기 위해", "적대적 M&A를 방어하기 위해", "부채 비율을 낮추기 위해"], a: 0 }
];

const poolCANSLIM = [
  { q: "CAN SLIM 기법에서 'C'가 의미하는 것은?", options: ["Current quarterly earnings (최근 분기 주당순이익의 폭발적 증가)", "Capital (자본금 규모)", "Chart (차트 패턴)", "CEO (경영진의 우수성)"], a: 0 },
  { q: "CAN SLIM에서 'A'가 요구하는 연간 수익 증가율의 기준은 최소 얼마 이상인가?", options: ["최소 25% 이상의 연간 순이익 증가율", "최소 5% 이상의 연간 순이익 증가율", "최소 50% 이상의 연간 배당 증가율", "최소 10% 이상의 매출 증가율"], a: 0 },
  { q: "윌리엄 오닐이 가장 선호하는 차트 패턴(컵 앤 핸들)의 핵심 특징은?", options: ["이전 저항선을 돌파하기 전 얕은 거래량으로 조정을 거치는 손잡이(Handle) 부분의 존재", "V자 형태로 급반등하는 모양", "계속해서 하락하는 우하향 차트", "거래량이 폭발하며 윗꼬리를 길게 다는 모양"], a: 0 },
  { q: "CAN SLIM에서 'N'은 New(신제품, 신고가 등)를 의미한다. 오닐은 어떤 주식을 매수하라고 했는가?", options: ["52주 신고가를 돌파하거나 사상 최고가를 경신하는 주식", "52주 신저가를 갱신하는 저렴한 주식", "가격이 5달러 미만인 동전주", "배당을 처음 지급하기 시작한 주식"], a: 0 },
  { q: "오닐의 절대 손절 원칙은 매수가 대비 몇 퍼센트 하락 시 기계적 매도인가?", options: ["-7% ~ -8%", "-20%", "-3%", "본전이 올 때까지 존버한다"], a: 0 },
  { q: "CAN SLIM에서 'S' (Supply and Demand)에 대한 설명으로 옳은 것은?", options: ["총 발행 주식수가 지나치게 많지 않고, 돌파 시점에 거래량이 크게 증가해야 한다", "주식수가 무한히 많을수록 안전하다", "거래량이 적을 때 매수해야 한다", "개인 투자자들의 매수세가 많아야 한다"], a: 0 },
  { q: "CAN SLIM에서 'L' (Leader or Laggard)의 원칙은 무엇인가?", options: ["해당 산업군에서 주도주(Leader)를 매수하고, 소외주(Laggard)는 피하라", "소외주를 저점에서 매수하여 기다려라", "가장 늦게 오르는 주식을 찾아라", "대형주만 매수하라"], a: 0 },
  { q: "오닐이 강세장과 약세장을 판단하는 'M' (Market Direction)을 분석할 때 주로 보는 것은?", options: ["주요 시장 지수(나스닥, S&P 500 등)의 가격과 거래량의 움직임(분배일 확인)", "금리 변동", "전문가들의 뉴스 전망", "PER 등 밸류에이션 지표"], a: 0 },
  { q: "윌리엄 오닐은 주식을 매수할 때 피라미딩(Pyramiding) 기법을 추천했다. 이는 무엇인가?", options: ["돌파점 매수 후 수익이 나며 상승할 때 점진적으로 추가 매수(불타기)하는 것", "주가가 하락할 때마다 평단가를 낮추기 위해 추가 매수(물타기)하는 것", "여러 종목에 동일한 금액을 분산 투자하는 것", "한 번에 풀매수하는 것"], a: 0 },
  { q: "CAN SLIM에서 'I' (Institutional Sponsorship)가 의미하는 바는?", options: ["우수한 실적을 내는 기관 투자자들이 해당 주식을 매수/보유하고 있어야 한다", "개인 투자자들 사이에서 인기가 많아야 한다", "정부 기관의 지원을 받아야 한다", "외국인 투자자가 50% 이상이어야 한다"], a: 0 },
  { q: "컵 앤 핸들 패턴에서 '손잡이(Handle)' 부분이 형성될 때 거래량의 특징은 어떠해야 하는가?", options: ["매도세가 말라붙으며 거래량이 눈에 띄게 감소해야 한다", "거래량이 폭발적으로 증가해야 한다", "기관의 대량 매도가 발생해야 한다", "이전 컵의 왼쪽 부분보다 거래량이 많아야 한다"], a: 0 },
  { q: "오닐은 PER(주가수익비율)에 대해 어떻게 생각했는가?", options: ["PER이 높더라도 폭발적인 성장을 하는 최고의 주식이라면 매수할 가치가 있다", "PER이 10 이하인 저평가 가치주만 사야 한다", "PER은 매매에 절대적인 기준이다", "PER이 높은 주식은 무조건 공매도해야 한다"], a: 0 },
  { q: "오닐의 시장 방향 분석 중 '분배일(Distribution Day)'의 정의는?", options: ["전일 대비 거래량이 증가하면서 지수가 하락(또는 거의 오르지 못함)으로 마감하는 날", "전일 대비 거래량이 감소하며 지수가 상승하는 날", "배당금이 지급되는 날", "기관이 주식을 대거 매수하는 날"], a: 0 },
  { q: "윌리엄 오닐이 피해야 한다고 강조한 매매 습관은?", options: ["물타기 (하락하는 주식을 추가 매수하여 평단가를 낮추는 것)", "손절매 (손실을 확정 짓는 것)", "신고가 돌파 매수", "차트 분석"], a: 0 },
  { q: "오닐이 매도 신호로 본 '클라이맥스 탑(Climax Top)'의 특징은?", options: ["수개월간 상승하던 주식이 갑자기 거래량이 폭증하며 수직 상승(갭상승 등)하는 며칠간의 과열 현상", "거래량이 급감하며 주가가 횡보하는 현상", "기관의 대량 매수 뉴스가 나오는 현상", "배당 컷(배당 축소) 발표"], a: 0 }
];

const poolBehavior = [
  { q: "강세장(Bull Market)에서 주도주를 보유하고 있을 때 가장 적절한 행동은?", options: ["추세가 꺾이기 전까지 섣불리 수익을 실현하지 않고 수익을 극대화한다", "2~3% 수익이 나면 즉시 전량 매도한다", "다른 소외주로 갈아탄다", "주가가 오를 때마다 공매도를 친다"], a: 0 },
  { q: "약세장(Bear Market)이 명확해졌을 때 가장 중요한 계좌 방어 전략은?", options: ["현금 비중을 높이고 신규 매수를 멈추거나 최소화한다", "떨어진 주식을 계속 물타기 한다", "레버리지 상품에 투자하여 하락을 만회한다", "바닥을 예측하여 몰빵 투자를 한다"], a: 0 },
  { q: "상승장 초기에 가장 먼저 해야 할 일은?", options: ["가장 먼저 신고가를 돌파하며 강하게 치고 나가는 새로운 주도주군을 파악하고 매수한다", "과거에 많이 떨어졌던 낙폭과대주를 찾는다", "인버스(하락 베팅) 상품을 매수한다", "모든 주식을 매도하고 관망한다"], a: 0 },
  { q: "하락장에서 '데드캣 바운스(Dead Cat Bounce)'가 발생했을 때 주의할 점은?", options: ["일시적인 기술적 반등일 수 있으므로 추세가 완전히 전환되기 전까지는 공격적 매수를 자제한다", "바닥을 확인한 것이므로 신용/미수를 써서 풀매수한다", "우량주는 무조건 전고점을 돌파할 것이라 믿고 존버한다", "공매도를 전량 청산한다"], a: 0 },
  { q: "시장 변동성이 극심한 장세(Choppy Market)에서 살아남는 윌리엄 오닐의 조언은?", options: ["돌파 후 실패하는 패턴이 잦아지면 매매 횟수를 줄이고 섣불리 진입하지 않는다", "변동성을 이용하여 하루에 수십 번 단타 매매를 한다", "손절 폭을 기존 8%에서 20%로 넓혀 버틴다", "오히려 투자 금액을 두 배로 늘린다"], a: 0 },
  { q: "주도주가 고점에서 거래량이 폭증하며 갭상승하는 '클라이맥스' 징후가 나타날 때 행동 요령은?", options: ["탐욕이 극에 달한 시점이므로 분할 매도를 통해 수익을 실현할 준비를 한다", "새로운 상승의 시작이므로 추격 매수한다", "자녀에게 물려주기 위해 계좌를 덮어둔다", "가족과 친구들에게 매수를 강력히 추천한다"], a: 0 },
  { q: "하락장에서 손실이 발생하여 원금이 줄어들었을 때 가장 경계해야 할 심리는?", options: ["본전을 빨리 복구하겠다는 조급함에 무리한 베팅(레버리지, 단타)을 하는 것", "시장을 관망하며 공부에 집중하는 것", "투자 일지를 작성하며 실패 원인을 분석하는 것", "현금 비중을 100%로 유지하는 것"], a: 0 },
  { q: "강세장이 장기간 지속되어 주식들이 컵 앤 핸들의 3~4번째 베이스를 형성할 때의 주의점은?", options: ["초기 베이스에 비해 실패 확률이 매우 높으므로 신규 매수에 극도로 신중해야 한다", "베이스가 많을수록 신뢰도가 높으므로 안심하고 매수한다", "모든 주식이 오르므로 무작위로 매수해도 된다", "가치투자 방식으로 전환해야 한다"], a: 0 },
  { q: "약세장에서 반등을 시도하는 '팔로우스루 데이(Follow-Through Day)'를 확인할 때 필수적인 조건은?", options: ["주요 지수가 반등을 시도한 지 4일~10일 즈음에 거래량이 전일보다 증가하며 지수가 크게 상승하는 것", "주요 지수가 10일 연속으로 하락하는 것", "외국인이 1조원 이상 순매수하는 것", "개인 투자자의 신용 융자 잔고가 최고치를 찍는 것"], a: 0 },
  { q: "자신이 보유한 주식이 시장의 급락과 무관하게 지지선을 강하게 버티고 있을 때의 판단은?", options: ["매우 강한 상대강도(RS)를 보여주는 주도주 후보이므로 지켜본다", "시장을 거스르는 세력의 장난이므로 즉시 매도한다", "조만간 폭락할 징조이므로 공매도한다", "주식의 거래가 정지될 가능성이 높다"], a: 0 },
  { q: "상승장에서 내 종목은 오르지만, 전체 시장 지수에서 분배일이 5~6개 이상 출현했다면?", options: ["시장 전체가 하락 반전할 가능성이 높으므로 포지션을 축소하고 방어적으로 대응한다", "내 종목은 시장과 무관하므로 목표가까지 끝까지 버틴다", "오히려 낙폭과대주를 추가 매수할 기회다", "분배일은 강세장의 매수 신호이므로 불타기를 한다"], a: 0 },
  { q: "하락장에서 손절매 원칙을 어기고 비자발적 장기투자를 하게 되는 가장 큰 심리적 원인은?", options: ["손실을 확정 짓는 고통을 피하려는 심리 (손실회피 편향)", "장기투자의 복리 효과를 믿기 때문", "주식이 상장폐지될 확률이 0%라는 확신", "배당금을 받기 위한 전략적 선택"], a: 0 },
  { q: "조정장에서 올바른 행동은?", options: ["최근 강세장에서 어떤 종목들이 왜 올랐는지 복기하고 다음 주도주를 찾기 위한 관심 종목을 정리한다", "주식 창을 닫고 시장을 완전히 잊어버린다", "전문가들의 핑계를 찾아 위안을 얻는다", "마이너스 계좌를 보며 매일 자책한다"], a: 0 },
  { q: "본데의 철학에 따르면, 주식 매매에서 감정을 배제하기 위해 가장 필요한 것은?", options: ["사전에 철저히 계획된 원칙(매수, 매도, 손절)을 기계적으로 실행하는 것", "시황 뉴스에 귀를 기울이며 유연하게 대처하는 것", "직감과 육감을 믿고 과감하게 베팅하는 것", "수익이 날 때까지 기도하는 것"], a: 0 },
  { q: "강세장의 끝자락에서 주로 나타나는 특징이 아닌 것은?", options: ["모든 매스컴에서 경제 위기와 주가 폭락을 경고한다", "주식 시장에 전혀 관심 없던 대중들까지 빚을 내어 주식에 뛰어든다", "실체가 없는 부실주들이 연일 상한가를 기록한다", "주도주들이 지지선을 깨며 거래량 실린 하락을 시작한다"], a: 0 }
];

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

// Select 10 from each pool
const selectedBasic = shuffle([...poolBasic]).slice(0, 10);
const selectedCANSLIM = shuffle([...poolCANSLIM]).slice(0, 10);
const selectedBehavior = shuffle([...poolBehavior]).slice(0, 10);

// Combine and shuffle order
let examQuestions = shuffle([...selectedBasic, ...selectedCANSLIM, ...selectedBehavior]);

// Shuffle options
const finalQuestions = examQuestions.map(qObj => {
    const correctAnswerText = qObj.options[qObj.a];
    const shuffledOptions = shuffle([...qObj.options]);
    const newAnswerIndex = shuffledOptions.indexOf(correctAnswerText);
    return {
        q: qObj.q,
        options: shuffledOptions,
        correctIndex: newAnswerIndex
    };
});

const introForm = document.getElementById('intro-form');
const examForm = document.getElementById('exam-form');
const startBtn = document.getElementById('start-exam-btn');
const submitBtn = document.getElementById('submit-exam-btn');
const questionsContainer = document.getElementById('questions-container');
const timerEl = document.getElementById('timer');
const resultBox = document.getElementById('result-box');

let timerInterval;
let timeLeft = 10 * 60; // 10 minutes

function renderQuestions() {
    questionsContainer.innerHTML = '';
    finalQuestions.forEach((q, index) => {
        const card = document.createElement('div');
        card.className = 'question-card';
        card.innerHTML = `
            <div class="question-text">Q${index + 1}. ${q.q}</div>
            <div class="options-list">
                ${q.options.map((opt, i) => `
                    <label class="option-label" onclick="selectOption(this, 'q${index}')">
                        <input type="radio" name="q${index}" value="${i}">
                        ${opt}
                    </label>
                `).join('')}
            </div>
        `;
        questionsContainer.appendChild(card);
    });
}

window.selectOption = function(labelEl, groupName) {
    const labels = document.querySelectorAll(`input[name="${groupName}"]`);
    labels.forEach(input => {
        input.closest('.option-label').classList.remove('selected');
    });
    labelEl.classList.add('selected');
    labelEl.querySelector('input').checked = true;
};

function startTimer() {
    timerEl.style.display = 'block';
    timerInterval = setInterval(() => {
        timeLeft--;
        const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
        const s = (timeLeft % 60).toString().padStart(2, '0');
        timerEl.textContent = `${m}:${s}`;
        
        if (timeLeft <= 60) {
            timerEl.classList.add('warning');
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("시간 초과! 자동으로 답안이 제출됩니다.");
            finishExam();
        }
    }, 1000);
}

function finishExam() {
    clearInterval(timerInterval);
    timerEl.style.display = 'none';
    examForm.style.display = 'none';
    resultBox.style.display = 'block';
    window.scrollTo(0, 0);
    
    let score = 0;
    finalQuestions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected && parseInt(selected.value) === q.correctIndex) {
            score++;
        }
    });

    const statusEl = document.getElementById('result-status');
    const scoreEl = document.getElementById('result-score');
    const msgEl = document.getElementById('result-msg');
    
    scoreEl.textContent = `최종 점수: ${score}점 / 만점 30점`;

    if (score >= 25) {
        statusEl.textContent = '합격 (PASS)';
        statusEl.className = 'pass-text';
        msgEl.innerHTML = `축하합니다! 사령부 정예 요원 입성 자격을 획득하셨습니다.<br>오닐의 원칙을 지키는 훌륭한 트레이더가 되시길 기원합니다.`;
        document.getElementById('go-dashboard-btn').style.display = 'block';
        
        // localStorage에 자격 획득 기록
        localStorage.setItem('exam_passed', 'true');
    } else {
        statusEl.textContent = '불합격 (FAIL)';
        statusEl.className = 'fail-text';
        msgEl.innerHTML = `아쉽게도 합격 기준(25점)을 충족하지 못했습니다.<br>시장의 기본과 오닐의 철학을 다시 복습하고 재도전 해주세요.`;
        document.getElementById('retry-exam-btn').style.display = 'block';
    }
}

if(startBtn) {
    startBtn.addEventListener('click', () => {
        introForm.style.display = 'none';
        examForm.style.display = 'block';
        renderQuestions();
        startTimer();
        window.scrollTo(0, 0);
    });
}

if(submitBtn) {
    submitBtn.addEventListener('click', () => {
        if(confirm('정말 답안을 제출하시겠습니까? 제출 후에는 수정할 수 없습니다.')) {
            finishExam();
        }
    });
}

const goDashBtn = document.getElementById('go-dashboard-btn');
if(goDashBtn) {
    goDashBtn.addEventListener('click', () => {
        window.location.href = 'dashboard.html';
    });
}

const retryBtn = document.getElementById('retry-exam-btn');
if(retryBtn) {
    retryBtn.addEventListener('click', () => {
        window.location.reload();
    });
}
