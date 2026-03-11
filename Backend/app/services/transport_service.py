import uuid

from models.status import Status
from storage.json_storage import *


def get_all_transports():
    data = load_data()
    return data["transports"]

def get_transport_by_id(transport_id: str):
    data = load_data()

    for transport in data["transports"]:
        if transport["id"] == transport_id:
            return transport

    return None

def delete_transport(transport_id: str):
    data = load_data()

    for t in data["transports"]:
        if t["id"] == transport_id:
            data["transports"].remove(t)
            save_data(data)
            return t

    return None

def create_transport_request(pickup_location, drop_off_location, assigned_timeframe, priority):
    data = load_data()

    new_transport_request = {
        "id": str(uuid.uuid4()),
        "pickup_location": pickup_location,
        "drop_off_location": drop_off_location,
        "assigned_timeframe": assigned_timeframe.isoformat(),
        "priority": priority.value,
        "status": Status.OPEN.value,
    }
    data["transports"].append(new_transport_request)
    save_data(data)

    return new_transport_request

def update_transport_request(transport_id: str, status):

    data = load_data()

    for t in data["transports"]:
        if t["id"] == transport_id:
            t["status"] = status.value

            save_data(data)
            return t

    return None
