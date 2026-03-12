import type {TransportRequest} from "../../types/TransportRequest.ts";
import {Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import {fetchTransports} from "../../api/transports.ts";
import {useQuery} from "@tanstack/react-query";

interface Props {
    onEdit:  (transport: TransportRequest) => void
}

function formatDate(datetime: string) {
    const date = new Date(datetime);
    const day = String(date.getDate());
    const month = String(date.getMonth() + 1);
    const year = String(date.getFullYear());

    return `${day}-${month}-${year}`;
}

function priorityLabel(priority: number) {
    return ["Low", "Medium", "High", "Urgent"][priority] ?? "-";
}

export default function TransportTable({onEdit}: Props) {

    const {data: transports = []} = useQuery({
        queryKey: ["transports"],
        queryFn: fetchTransports
    })

    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Pickup</TableCell>
                        <TableCell>Drop off</TableCell>
                        <TableCell>Assigned Date</TableCell>
                        <TableCell>Priority</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right"/>
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