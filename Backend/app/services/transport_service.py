import uuid

from models.SortingOrder import SortingOrder
from models.status import Status
from storage.json_storage import *


def get_all_transports():
    data = load_transport_data()
    return data["transports"]


def get_transports_paginated(
        page: int = 1,
        limit: int = 10,
        sort_by: str | None = None,
        sort_order: SortingOrder = SortingOrder.asc,
        assigned_service: str | None = None
):
    data = load_transport_data()
    transports = data["transports"]

    if assigned_service:
        transports = [t for t in transports if t.get("assigned_service") == assigned_service]

    if sort_by:
        reverse = sort_order == SortingOrder.desc
        transports = sorted(transports, key=lambda x: x.get(sort_by, 0), reverse=reverse)

    total = len(transports)
    total_pages = (total + limit - 1) // limit if limit > 0 else 0
    start = (page - 1) * limit
    end = start + limit

    return {
        "data": transports[start:end],
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": total_pages
    }

def get_transport_by_id(transport_id: str):
    data = load_transport_data()

    for transport in data["transports"]:
        if transport["id"] == transport_id:
            return transport

    return None

def delete_transport(transport_id: str):
    data = load_transport_data()

    for t in data["transports"]:
        if t["id"] == transport_id:
            data["transports"].remove(t)
            save_transport_data(data)
            return t

    return None

def create_transport_request(pickup_location, drop_off_location, assigned_timeframe, priority, assigned_service: str):
    data = load_transport_data()

    new_transport_request = {
        "id": str(uuid.uuid4()),
        "pickup_location": pickup_location,
        "drop_off_location": drop_off_location,
        "assigned_timeframe": assigned_timeframe.isoformat(),
        "priority": priority.value,
        "status": Status.ASSIGNED.value,
        "assigned_service": assigned_service,
    }
    data["transports"].append(new_transport_request)
    save_transport_data(data)

    return new_transport_request

def update_transport_request(transport_id: str, status):
    data = load_transport_data()

    for t in data["transports"]:
        if t["id"] == transport_id:
            t["status"] = status.value

            save_transport_data(data)
            return t

    return None
