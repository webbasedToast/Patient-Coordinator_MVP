from fastapi import APIRouter, HTTPException

from schemas.transport_schemas import *
from services.transport_service import *

#router = APIRouter(prefix="/transports", tags=["transports"])
router = APIRouter(tags=["transports"])

@router.get("/transports")
def list_all_transports():
    return get_all_transports()

@router.get("/transports/{transport_id}")
def get_transport(transport_id: UUID):
    transport = get_transport_by_id(str(transport_id))
    if transport is None:
        raise HTTPException(status_code=404, detail=f"no transport found with id {transport_id}")

    return transport

@router.post("/add-transport")
def create_transport_endpoint(data: TransportCreate):
    return create_transport_request(
        data.pickup_location,
        data.drop_off_location,
        data.assigned_timeframe,
        data.priority
    )

@router.put("/transports/{transport_id}/status")
def update_transport(transport_id: UUID, update: TransportStatusUpdate):
    transport = update_transport_request(str(transport_id), update.status)
    if not transport:
        raise HTTPException(status_code=404, detail=f"no transport found with id {transport_id}")
    return transport

@router.delete("/transports/{transport_id}")
def delete_transport(transport_id: UUID):
    transport = delete_transport(str(transport_id))
    if transport is None:
        raise HTTPException(status_code=404, detail=f"no transport found with id {transport_id}")

    return transport
