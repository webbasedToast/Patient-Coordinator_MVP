import { api } from "./client.ts";
import type {Transport} from "../types/Transport.ts";

export async function fetchTransports(): Promise<Transport[]> {
    const res = await api.get('/transports');

    return res.data;
}

export async function createTransport(data: Partial<Transport>) {
    const res= await api.post('/transports', data)

    return res.data
}

export async function updateTransportStatus(id: string, status: string) {
    const response = await api.patch(`/transports/${id}/status`, {
        status
    });

    return response.data
}
