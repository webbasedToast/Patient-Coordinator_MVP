import uuid
from uuid import UUID

from models.SortingOrder import SortingOrder
from storage.json_storage import load_user_data, save_user_data


def get_all_users():
    data = load_user_data()
    return data["users"]

def get_all_users_paginated(
        page: int = 1,
        limit_per_page: int = 10,
        sort_by: str | None = None,
        sort_order: SortingOrder = SortingOrder.asc
):
    user_data = load_user_data()
    users = user_data["users"]

    if sort_by:
        reverse = sort_order == SortingOrder.desc
        users = sorted(users, key=lambda x: x.get(sort_by, 0), reverse=reverse)

    total = len(users)
    total_pages = (total + limit_per_page - 1) // limit_per_page if limit_per_page > 0 else 0
    start_index = (page - 1) * limit_per_page
    end_index = start_index + limit_per_page

    return {
        "data": users[start_index:end_index],
        "total": total,
        "page": page,
        "limit_per_page": limit_per_page,
        "total_pages": total_pages
    }


def get_user_by_name(user_name: str):
    data = load_user_data()
    for user in data["users"]:
        if user["user_name"] == user_name:
            return user
    return None


def get_user(user_id: UUID):
    data = load_user_data()
    return data["users"][user_id]

def create_user(user_name: str, user_type):
    data = load_user_data()

    new_user = {
        "id": str(uuid.uuid4()),
        "user_name": user_name,
        "user_type": user_type
    }

    data["users"].append(new_user)
    save_user_data(data)

    return new_user

def delete_user(user_id: str):
    data = load_user_data()
    for user in data["users"]:
        if user["id"] == user_id:
            data["users"].remove(user)
            save_user_data(data)
            return user

    return None
