from pydantic import BaseModel
from uuid import UUID

from models.user_type import UserType


class UserCreate(BaseModel):
    user_name: str
    user_type: UserType

# class UserResponse(BaseModel):
#     id: UUID
#     user_name: str
#     user_type: UserType
