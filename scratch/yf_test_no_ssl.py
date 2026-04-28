import yfinance as yf
import requests
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

def get_data_no_ssl():
    session = requests.Session()
    session.verify = False
    
    print("Fetching NVDA without SSL verification...")
    try:
        data = yf.download("NVDA", period="5d", session=session, progress=False)
        if not data.empty:
            print("Success!")
            print(data.tail())
        else:
            print("Failed (Empty)")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    get_data_no_ssl()
