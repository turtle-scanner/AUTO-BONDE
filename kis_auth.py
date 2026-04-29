import os
import time
import json
import logging
import requests
import ssl
from requests.adapters import HTTPAdapter
import urllib3

# SSL 인증서 경고 무시
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# 로깅 설정
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

_session = requests.Session()
# 어댑터 없이 기본 설정으로 시도

# ----------------------------------------------------------------
# 환경 변수 및 설정
# ----------------------------------------------------------------
APP_KEY      = os.getenv("KIS_APP_KEY", "PSzuu6dcYxkkHvTyAXm61J1Zta6oBrSZHoaq")
APP_SECRET   = os.getenv("KIS_APP_SECRET", "H5dGS5kHK3AbpskI0E0ovYAL6aS82Li/4SioJGlLK6ypvlc3ejf1NNpbwkxTpsuO81mhqEFOW62OaFSCRtd/J9/v8c5WVKOf0uMigMblMeMI1riXUaeVf+LuBnSE+kXN1OEkn1MBlQ2GiLd4tFBEEQxOH/cQgFf0YaU2Q1S5OeHnecRCcuQ=")
ACCOUNT_NO   = os.getenv("KIS_ACCOUNT_NO", "4654671301")
ENVIRONMENT  = os.getenv("BONDE_ENV", "prod")

_token_info = {"access_token": None, "expires_at": 0}

def _request_token():
    # VPS(모의)와 PROD(실전) 도메인 구분
    base_url = "https://openapivts.koreainvestment.com:29443" if ENVIRONMENT == "vps" else "https://openapi.koreainvestment.com"
    url = f"{base_url}/oauth2/tokenP"
    
    headers = {"content-type": "application/json"}
    payload = {
        "grant_type": "client_credentials",
        "appkey": APP_KEY,
        "appsecret": APP_SECRET
    }
    
    try:
        # verify=False 를 추가하여 인증서 오류 우회
        response = _session.post(url, headers=headers, json=payload, verify=False, timeout=10)
        if response.status_code != 200:
            logger.error(f"KIS 토큰 발급 실패: {response.status_code} {response.text}")
            raise RuntimeError("KIS token request failed")
        
        data = response.json()
        _token_info["access_token"] = data["access_token"]
        _token_info["expires_at"] = int(time.time()) + int(data.get("expires_in", 3600)) - 300
        logger.info(f"KIS 토큰 발급 성공 (만료 {data.get('expires_in', 3600)}초 후)")
        return _token_info["access_token"]
    except Exception as e:
        logger.error(f"KIS 토큰 요청 중 오류: {e}")
        raise

def get_access_token():
    now = int(time.time())
    if not _token_info["access_token"] or now >= _token_info["expires_at"]:
        return _request_token()
    return _token_info["access_token"]

def get_auth_headers():
    token = get_access_token()
    return {
        "Authorization": f"Bearer {token}",
        "kh-User-Id": ACCOUNT_NO,
        "content-type": "application/json"
    }

def auth(svr: str = "prod", product: str = "01"):
    global ENVIRONMENT
    ENVIRONMENT = svr
    logger.info(f"KIS 인증 초기화 (svr={svr}, product={product})")
    get_access_token()
    logger.info("KIS 인증 완료")

# strategy_builder 와의 호환성을 위해 더미 getTREnv 추가
class TREnv:
    def __init__(self):
        self.my_app = APP_KEY
        self.my_sec = APP_SECRET
        self.my_acct = ACCOUNT_NO
        self.my_prod = "01"
        self.my_url = "https://openapivts.koreainvestment.com:29443" if ENVIRONMENT == "vps" else "https://openapi.koreainvestment.com"
        self.my_token = ""

def getTREnv():
    env = TREnv()
    env.my_token = get_access_token()
    return env

def _url_fetch(api_url, tr_id, tr_cont, params, postFlag=False):
    env = getTREnv()
    url = f"{env.my_url}{api_url}"
    headers = get_auth_headers()
    headers["tr_id"] = tr_id
    headers["tr_cont"] = tr_cont
    
    try:
        if postFlag:
            res = _session.post(url, headers=headers, json=params, verify=False, timeout=10)
        else:
            res = _session.get(url, headers=headers, params=params, verify=False, timeout=10)
        
        # APIResp 와 호환되는 객체 반환
        class Resp:
            def __init__(self, r):
                self.r = r
            def isOK(self):
                return self.r.status_code == 200 and self.r.json().get("rt_cd") == "0"
            def getBody(self):
                from collections import namedtuple
                data = self.r.json()
                return namedtuple("body", data.keys())(**data)
            def text(self):
                return self.r.text
        return Resp(res)
    except Exception as e:
        logger.error(f"API 호출 오류: {e}")
        return None
