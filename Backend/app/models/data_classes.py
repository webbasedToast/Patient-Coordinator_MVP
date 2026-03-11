from enum import Enum


class Location(str, Enum):
    STATION = "STATION"
    PATIENT_ROOM = "PATIENT_ROOM"
    OP = "OP"
    EMERGENCY_ROOM = "EMERGENCY_ROOM"

class Priority(int, Enum):
    LOW = 0
    MEDIUM = 1
    HIGH = 2
    URGENT = 3

class Status(str, Enum):
    OPEN = "OPEN"
    ASSIGNED = "ASSIGNED"
    IN_PROGRESS = "IN_PROGRESS"
    CLOSED = "CLOSED"
    CANCELLED = "CANCELLED"
