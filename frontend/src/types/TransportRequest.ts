export type LocationType = "STATION" | "PATIENT_ROOM" | "OP" | "EMERGENCY_ROOM";
export type PriorityType = 0 | 1 | 2 | 3;
export type StatusType = "OPEN" | "ASSIGNED" | "IN_PROGRESS" | "CLOSED" | "CANCELLED";

export interface TransportRequest {
    id: string;
    status: StatusType;
    pickup_location: LocationType;
    drop_off_location: LocationType;
    assigned_timeframe: string;
    priority: PriorityType;
}
