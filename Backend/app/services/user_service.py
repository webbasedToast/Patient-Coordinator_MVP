import uuid
from uuid import UUID

from storage.json_storage import load_user_data, save_user_data


def get_all_users():
    data = load_user_data()
    return data["users"]


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


