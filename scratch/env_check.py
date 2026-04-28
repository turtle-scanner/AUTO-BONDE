import sys
import os
import yaml
import logging

# Set base dir to the project root (one level up from scratch/)
SCRATCH_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_DIR = os.path.dirname(SCRATCH_DIR)
STRATEGY_DIR = os.path.join(BASE_DIR, "strategy_builder")

print(f"Project Base: {BASE_DIR}")
print(f"Strategy Dir: {STRATEGY_DIR}")

if STRATEGY_DIR not in sys.path:
    sys.path.append(STRATEGY_DIR)

try:
    import kis_auth as ka
    print("SUCCESS: kis_auth imported successfully")
except ImportError as e:
    print(f"ERROR: Failed to import kis_auth: {e}")
    # Try to see what's in the path
    print(f"Current Path: {sys.path}")
    sys.exit(1)

config_path = os.path.join(STRATEGY_DIR, "kis_devlp.yaml")
if os.path.exists(config_path):
    try:
        with open(config_path, 'r', encoding='utf-8') as f:
            config = yaml.safe_load(f)
        print("SUCCESS: kis_devlp.yaml loaded successfully")
        # Check for essential keys
        required_keys = ['my_app', 'my_sec', 'paper_app', 'paper_sec']
        missing_keys = [k for k in required_keys if k not in config]
        if missing_keys:
            print(f"ERROR: Missing keys in config: {missing_keys}")
        else:
            print("SUCCESS: All required keys present in config")
    except Exception as e:
        print(f"ERROR: Error loading config: {e}")
else:
    print(f"ERROR: Config file not found at {config_path}")

try:
    import pandas as pd
    import numpy as np
    import schedule
    import yfinance as yf
    print("SUCCESS: All main dependencies available")
except ImportError as e:
    print(f"ERROR: Missing dependency: {e}")
