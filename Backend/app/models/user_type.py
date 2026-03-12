from enum import Enum


class UserType(str, Enum):
    BASIC_USER = "BASIC_USER"
    ADMIN = "ADMIN"