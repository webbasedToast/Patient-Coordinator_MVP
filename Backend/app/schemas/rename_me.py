from datetime import datetime

from pydantic import BaseModel
from models.data_classes import Status, Location


class TransportCreate(BaseModel):
    pickup_location: Location
    drop_off_location: Location
    assigned_timeframe: datetime

class TransportStatusUpdate(BaseModel):
    status: Status