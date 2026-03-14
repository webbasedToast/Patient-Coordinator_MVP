import { api } from "./client.ts";
import { type User } from "../types/User.ts";

export type { User };

export interface PaginatedUsers {
    data: User[];
    total: number;
    page: number;
    limit_per_page: number;
    total_pages: number;
}

export async function fetchUsersPaginated(
    page: number = 1,
    limit_per_page: number = 10,
    sortBy?: string,
    sortOrder?: string
): Promise<PaginatedUsers>{
    const params = new URLSearchParams({
        page: page.toString(),
        limit_per_page: limit_per_page.toString()
    });
    if (sortBy) params.append("sort_by", sortBy);
    if (sortOrder) params.append("sort_order", sortOrder);

    const res = await api.get(`users/?${params}`);
    return res.data;
}


export async function fetchUsers(): Promise<User[]> {
    const res = await api.get('/users');
    return res.data;
}

export async function fetchBasicUsers(): Promise<User[]> {
    const res = await api.get('/users');
    const users: User[] = res.data.data;
    return users.filter(user => user.user_type === "BASIC_USER");
}

export async function loginUser(userName: string): Promise<{user_name: string; user_type: string}> {
    const res = await api.get(`/users/by-name/${userName}`);
    return res.data;
}

export async function addUser(data: Partial<User>) {
    const res = await api.post('/users/add-user', data);
    return res.data
}

export async function deleteUser(userId: string) {
    const res = await api.delete(`/users/${userId}`);
    return res.data;
}

