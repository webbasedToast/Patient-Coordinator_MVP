from fastapi import APIRouter, HTTPException
from uuid import UUID

from schemas.user_schemas import UserCreate
from services.user_service import create_user, get_all_users, get_user_by_name

router = APIRouter(prefix="/users", tags=["user"])


@router.get("/")
def get_users():
    return get_all_users()

@router.get("/by-name/{user_name}")
def login_user(user_name: str):
    user = get_user_by_name(user_name)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return {"user_name": user["user_name"], "user_type": user["user_type"]}

@router.post("/add-user")
def add_user(data: UserCreate):
    return create_user(data.user_name, data.user_type)

@router.get("/{user_id}")
def get_user(user_id: UUID):
    return get_user(user_id)

