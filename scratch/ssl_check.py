import urllib3
import ssl
print(f"urllib3 version: {urllib3.__version__}")
print(f"ssl version: {ssl.OPENSSL_VERSION}")
try:
    print(f"DEFAULT_CIPHERS: {urllib3.util.ssl_.DEFAULT_CIPHERS[:50]}...")
except AttributeError:
    print("urllib3.util.ssl_ has no DEFAULT_CIPHERS")
