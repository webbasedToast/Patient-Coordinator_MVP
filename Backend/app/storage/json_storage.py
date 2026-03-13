import json
from pathlib import Path
from threading import Lock

TRANSPORT_DATA_FILE = Path("data/patient_transports.json")
USER_DATA_FILE = Path("data/users.json")
file_lock = Lock()


def load_transport_data():
    with file_lock:
        if not TRANSPORT_DATA_FILE.exists():
            return {"transports": []}

        with open(TRANSPORT_DATA_FILE, "r") as f:
            return json.load(f)

def save_transport_data(data):
    with file_lock:
        with open(TRANSPORT_DATA_FILE, "w") as f:
            json.dump(data, f, indent=4, ensure_ascii=False)

def load_user_data():
    with file_lock:
        if not USER_DATA_FILE.exists():
            return {"transports": []}

        with open(USER_DATA_FILE, "r") as f:
            return json.load(f)

def save_user_data(data):
    with file_lock:
        with open(USER_DATA_FILE, "w") as f:
            json.dump(data, f, indent=4, ensure_ascii=False)

