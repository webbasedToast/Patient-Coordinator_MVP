from fastapi import APIRouter, HTTPException, Query
from uuid import UUID

from schemas.transport_schemas import TransportCreate, TransportStatusUpdate
from services.transport_service import *

router = APIRouter(prefix="/transports", tags=["transports"])

@router.get("/")
def list_all_transports(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    sort_by: str = Query(None),
    sort_order: SortingOrder = Query(SortingOrder.asc),
    assigned_service: str = Query(None)
):
    return get_transports_paginated(page, limit, sort_by, sort_order, assigned_service)

@router.get("/{transport_id}")
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
        data.priority,
        data.assigned_service
    )

@router.put("/{transport_id}/status")
def update_transport(transport_id: UUID, update: TransportStatusUpdate):
    transport = update_transport_request(str(transport_id), update.status)
    if not transport:
        raise HTTPException(status_code=404, detail=f"no transport found with id {transport_id}")
    return transport

@router.delete("/{transport_id}")
def delete_transport(transport_id: UUID):
    transport = delete_transport(str(transport_id))
    if transport is None:
        raise HTTPException(status_code=404, detail=f"no transport found with id {transport_id}")

    return transport
