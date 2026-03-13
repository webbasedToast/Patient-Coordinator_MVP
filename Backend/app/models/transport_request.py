from dataclasses import dataclass
from datetime import datetime
from uuid import UUID

from models.location import Location
from models.priority import Priority
from models.status import Status


@dataclass
class TransportRequest:
    id: UUID
    pickup_location: Location
    drop_off_location: Location
    assigned_timeframe: datetime
    priority: Priority
    status: Status
    assigned_service: str
