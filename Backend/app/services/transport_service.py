from models import transport_request
from models.transport_request import TransportRequest
from models.data_classes import Status
from storage.json_storage import *
from datetime import datetime
import uuid


# TODO: Impl. logic

def get_all_transports():
    data = load_data()
    return data

def get_transport_by_id(transport_id):
    data = load_data()

    for transport in data["transports"]:
        if transport.id == transport_id:
            return transport

    return None

def create_transport_request(pickup_location, drop_off_location, assigned_timeframe):
    data = load_data()

    new_transport_request = {
        "id": str(uuid.uuid4()),
        "pickup_location": pickup_location,
        "drop_off_location": drop_off_location,
        "assigned_timeframe": assigned_timeframe,
        # TODO: Extend me?
    }
    data["transports"].append(new_transport_request)
    save_data(data)

    return transport_request

def update_transport_request():
    return None