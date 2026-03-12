import type {TransportRequest} from "../../types/TransportRequest.ts";
import {Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {useEffect, useState} from "react";

import {fetchTransports} from "../../api/transports.ts";

interface Props {
    onEdit:  (transport: TransportRequest) => void
}

function formatDate(datetime: string) {
    const date = new Date(datetime);
    const day = String(date.getDay());
    const month = String(date.getMonth());
    const year = String(date.getFullYear());

    return `${day}-${month}-${year}`;
}

function priorityLabel(priority: number) {
    return ["Low", "Medium", "High", "Urgent"][priority] ?? "-";
}

export default function TransportTable({onEdit}: Props) {

    const [transports, setTransports] = useState<TransportRequest[]>([])

    useEffect(() => {
        fetchTransports().then(setTransports)
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Pickup Location</TableCell>
                        <TableCell>Dropoff Location</TableCell>
                        <TableCell>Assigned Time</TableCell>
                        <TableCell>Priority</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transports.map((t) => (
                        <TableRow key={t.id} hover>
                            <TableCell>{t.id}</TableCell>
                            <TableCell>{t.pickup_location}</TableCell>
                            <TableCell>{t.drop_off_location}</TableCell>
                            <TableCell>{formatDate(t.assigned_timeframe)}</TableCell>
                            <TableCell>{priorityLabel(t.priority)}</TableCell>
                            <TableCell>
                                <Chip label={t.status} size="small"/>
                            </TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => onEdit(t)}>
                                    <EditIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}