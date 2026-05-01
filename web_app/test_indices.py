import urllib.request
import json
try:
    res = urllib.request.urlopen('http://localhost:8000/api/market/indices')
    print(res.read().decode())
except Exception as e:
    print("Error:", e)
