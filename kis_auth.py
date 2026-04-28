# ------------------------------------------------------------
# 파일: g:\내 드라이브\AUTO BONDE\kis_auth.py
# KIS Open API 인증·토큰 관리 모듈 (사용자 제공 인증 정보)
# ------------------------------------------------------------
import os
import time
import json
import logging
import requests

# ----------------------------------------------------------------
# 사용자 환경 설정 – 제공된 값으로 교체합니다.
# ----------------------------------------------------------------
APP_KEY      = os.getenv("KIS_APP_KEY",      "PSzuu6dcYxkkHvTyAXm61J1Zta6oBrSZHoaq")      # 발급받은 App Key
APP_SECRET   = os.getenv("KIS_APP_SECRET",   "H5dGS5kHK3AbpskI0E0ovYAL6aS82Li/4SioJGlLK6ypvlc3ejf1NNpbwkxTpsuO81mhqEFOW62OaFSCRtd/J9/v8c5WVKOf0uMigMblMeMI1riXUaeVf+LuBnSE+kXN1OEkn1MBlQ2GiLd4tFBEEQxOH/cQgFf0YaU2Q1S5OeHnecRCcuQ=")   # 발급받은 App Secret
ACCOUNT_NO   = os.getenv("KIS_ACCOUNT_NO",   "4654671301")   # 계좌 번호 (예: 1234567890)
# 실전(production) / 모의(vps) 구분
ENVIRONMENT  = os.getenv("BONDE_ENV", "prod")   # prod 또는 vps

# ----------------------------------------------------------------
# 텔레그램 알림 설정
# ----------------------------------------------------------------
TELEGRAM_TOKEN = os.getenv("TELEGRAM_TOKEN", "8713555022:AAFu6WjY6HUpaw2eyYSBSZSrIhiTFex9uho")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID", "7998778160")

# ----------------------------------------------------------------
# 로그 설정
# ----------------------------------------------------------------
logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# ----------------------------------------------------------------
# 내부 변수 (멤버) – 토큰 캐시
# ----------------------------------------------------------------
_token_info = {
    "access_token": None,
    "expires_at":   0      # epoch 타임스탬프 (초)
}

# ----------------------------------------------------------------
# 1️⃣ 토큰 발급 요청
# ----------------------------------------------------------------
def _request_token():
    """KIS 인증 서버에 접근 토큰을 요청하고 반환한다."""
    url = "https://openapi.koreainvestment.com/oauth2/tokenP"
    headers = {
        "content-type": "application/json"
    }
    payload = {
        "grant_type": "client_credentials",
        "appkey": APP_KEY,
        "appsecret": APP_SECRET
    }
    response = requests.post(url, headers=headers, json=payload)
    if response.status_code != 200:
        logger.error("KIS 토큰 발급 실패: %s %s",
                     response.status_code, response.text)
        raise RuntimeError("KIS token request failed")
    data = response.json()
    _token_info["access_token"] = data["access_token"]
    # 토큰은 보통 1시간(3600초) 유효 → 5분 앞서 만료 처리
    _token_info["expires_at"] = int(time.time()) + int(data.get("expires_in", 3600)) - 300
    logger.info("KIS 토큰 성공적으로 발급 (만료 %s 초 후)",
                data.get("expires_in", 3600))
    return _token_info["access_token"]

# ----------------------------------------------------------------
# 2️⃣ 토큰 반환 (갱신 필요 시 자동 재요청)
# ----------------------------------------------------------------
def get_access_token():
    """현재 유효한 access_token 반환. 필요 시 자동 갱신."""
    now = int(time.time())
    if not _token_info["access_token"] or now >= _token_info["expires_at"]:
        logger.info("KIS 토큰이 없거나 만료되어 재발급합니다.")
        return _request_token()
    return _token_info["access_token"]

# ----------------------------------------------------------------
# 3️⃣ 인증 헤더 생성 (API 호출 시 사용)
# ----------------------------------------------------------------
def get_auth_headers():
    """Authorization 헤더 딕셔너리 반환."""
    token = get_access_token()
    return {
        "Authorization": f"Bearer {token}",
        "kh-User-Id": ACCOUNT_NO,
        "content-type": "application/json"
    }

# ----------------------------------------------------------------
# 4️⃣ 초기 인증 함수 (프로그램 시작 시 호출)
# ----------------------------------------------------------------
def auth(svr: str = "prod", product: str = "01"):
    """다른 모듈에서 `ka.auth(svr=..., product=...)` 형태로 호출한다.
    현재 구현에서는 단순히 토큰을 미리 받아두는 역할만 수행한다.
    - svr : 'prod' (실전) 또는 'vps' (모의) 선택
    - product : API 사용 구분값, 보통 "01"
    """
    logger.info("KIS 인증 초기화 요청 (svr=%s, product=%s)", svr, product)
    # 실제로는 svr/vps 구분을 토대로 다른 endpoint를 사용할 수도 있다.
    # 여기서는 동일 토큰을 사용하므로 get_access_token() 호출만 수행한다.
    get_access_token()
    logger.info("KIS 인증 초기화 완료")

# ------------------------------------------------------------
