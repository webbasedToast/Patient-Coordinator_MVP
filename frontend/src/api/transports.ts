import { api } from "./client.ts";
import type {TransportRequest} from "../types/TransportRequest.ts";

export interface PaginatedTransports {
    data: TransportRequest[];
    total: number;
    page: number;
    limit: number;
    total_pages: number;
}

export async function fetchTransports(
    page: number = 1,
    limit: number = 10,
    sortBy?: string,
    sortOrder?: string,
    assignedService?: string
): Promise<PaginatedTransports> {
    const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
    });
    if (sortBy) params.append('sort_by', sortBy);
    if (sortOrder) params.append('sort_order', sortOrder);
    if (assignedService) params.append('assigned_service', assignedService);

    const res = await api.get(`/transports?${params}`);
    return res.data;
}

export async function createTransport(data: Partial<TransportRequest>) {
    const res= await api.post('/transports/add-transport', data)
    return res.data
}

export async function updateTransportStatus(id: string, status: string) {
    const response = await api.put(`/transports/${id}/status`, { status })
    return response.data
}
