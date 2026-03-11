import json
from pathlib import Path
from threading import Lock

DATA_FILE = Path("data/patient_transports.json")
file_lock = Lock()


def load_data():
    with file_lock:
        with open(DATA_FILE, "r") as f:
            return json.load(f)

def save_data(data):
    with file_lock:
        with open(DATA_FILE, "w") as f:
            json.dump(data, f)