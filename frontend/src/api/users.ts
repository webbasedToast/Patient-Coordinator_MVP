import { api } from "./client.ts";
import { type User } from "../types/User.ts";

export type { User };


export async function fetchUsers(): Promise<User[]> {
    const res = await api.get('/users');
    return res.data;
}

export async function fetchBasicUsers(): Promise<User[]> {
    const res = await api.get('/users');
    const users: User[] = res.data;
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

