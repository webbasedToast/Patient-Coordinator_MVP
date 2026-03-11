from uuid import UUID

from fastapi import APIRouter, HTTPException

from schemas.schemas import *
from services.transport_service import *

router = APIRouter(prefix="/transports", tags=["transports"])


@router.get("/")
def list_all_transports():
    return get_all_transports()

@router.get("/{transport_id}")
def get_transport(transport_id: UUID):
    transport = get_transport_by_id(str(transport_id))
    if transport is None:
        raise HTTPException(status_code=404, detail=f"no transport found with id {transport_id}")

    return transport

@router.post("/")
def create_transport_endpoint(data: TransportCreate):
    return create_transport_request(
        data.pickup_location,
        data.drop_off_location,
        data.assigned_timeframe,
        data.priority
    )

@router.patch("/{transport_id}/status")
def update_transport(transport_id: UUID, update: TransportStatusUpdate):
    transport = update_transport_request(str(transport_id), update.status)
    if not transport:
        raise HTTPException(status_code=404, detail=f"no transport found with id {transport_id}")
    return transport


