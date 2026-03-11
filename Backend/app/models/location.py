from enum import Enum


class Location(str, Enum):
    STATION = "STATION"
    PATIENT_ROOM = "PATIENT_ROOM"
    OP = "OP"
    EMERGENCY_ROOM = "EMERGENCY_ROOM"