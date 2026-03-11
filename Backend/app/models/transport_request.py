from datetime import datetime

from pydantic import BaseModel

from models.location import Location
from models.priority import Priority
from models.status import Status


class TransportRequest(BaseModel):
    id: str
    pickup_location: Location
    drop_off_location: Location
    assigned_timeframe: datetime
    priority: Priority
    status: Status
