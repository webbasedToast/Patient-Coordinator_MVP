import { api } from "./client.ts";
import type {TransportRequest} from "../types/TransportRequest.ts";

export async function fetchTransports(): Promise<TransportRequest[]> {
    const res = await api.get('/transports');
    return res.data;
}

export async function createTransport(data: Partial<TransportRequest>) {
    const res= await api.post('/transports', data)
    return res.data
}

export async function updateTransportStatus(id: string, status: string) {
    const response = await api.put(`/transports/${id}/status`, { status })
    return response.data
}
