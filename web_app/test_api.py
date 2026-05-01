import urllib.request
import json
import urllib.error

req = urllib.request.Request(
    'http://localhost:8000/api/login', 
    data=json.dumps({'username': 'cntfed', 'password': 'cntfed'}).encode('utf-8'), 
    headers={'Content-Type': 'application/json'}
)
try: 
    res = urllib.request.urlopen(req)
    print(res.read().decode())
except urllib.error.HTTPError as e: 
    print("HTTP Error:", e.code)
    print("Response Body:", e.read().decode())
except Exception as e:
    print("Error:", e)
