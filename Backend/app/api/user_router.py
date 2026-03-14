from fastapi import APIRouter, HTTPException, Query
from uuid import UUID

from models.SortingOrder import SortingOrder
from schemas.user_schemas import UserCreate
from services.user_service import create_user, get_all_users_paginated, get_user_by_name, delete_user as delete_user_service

router = APIRouter(prefix="/users", tags=["user"])


@router.get("/")
def get_users(
        page: int = Query(1, ge=1),
        limit_per_page: int = Query(10, ge=1, le=100),
        sort_by: str = Query(None, alias="-user_type"),
        sort_order: SortingOrder = Query(SortingOrder.asc)
):
    return get_all_users_paginated(page, limit_per_page, sort_by, sort_order)

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

@router.delete("/{user_id}")
def delete_user_endpoint(user_id: UUID):
    user = delete_user_service(str(user_id))
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
