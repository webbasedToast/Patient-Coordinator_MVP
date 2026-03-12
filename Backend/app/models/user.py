from dataclasses import dataclass
from uuid import UUID

from models.user_type import UserType


@dataclass
class User:
    id: UUID
    user_name: str
    role: UserType
