from datetime import datetime

from pydantic import BaseModel
from models.data_classes import *

class TransportRequest(BaseModel):
    id: str
    pickup_location: Location
    drop_off_location: Location
    assigned_timeframe: datetime
    priority: Priority
    status: Status
