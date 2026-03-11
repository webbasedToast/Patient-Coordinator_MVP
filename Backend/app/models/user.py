from enum import Enum


class User(str, Enum):
    BASIC_USER = "BASIC_USER"
    ADMIN = "ADMIN"