from datetime import datetime
from uuid import UUID

from pydantic import BaseModel

from models.location import Location
from models.priority import Priority
from models.status import Status


class TransportCreate(BaseModel):
    pickup_location: Location
    drop_off_location: Location
    assigned_timeframe: datetime
    priority: Priority
    assigned_service: str

class TransportStatusUpdate(BaseModel):
    status: Status

class TransportResponse(BaseModel):
    id: UUID
    pickup_location: Location
    drop_off_location: Location
    assigned_timeframe: datetime
    priority: Priority
    status: Status
    assigned_service: str
