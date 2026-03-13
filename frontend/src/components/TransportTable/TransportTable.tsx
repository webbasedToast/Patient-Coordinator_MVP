import type {TransportRequest} from "../../types/TransportRequest.ts";
import {Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {fetchTransports} from "../../api/transports.ts";
import {useQuery} from "@tanstack/react-query";
import {useState, useMemo} from "react";
import "./TransportTable.scss";

type SortKey = 'priority' | 'status' | 'assigned_timeframe';
type SortDirection = 'asc' | 'desc' | null;

interface SortConfig {
    key: SortKey | null;
    direction: SortDirection;
}

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

    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: null });

    const handleSort = (key: SortKey) => {
        setSortConfig((current) => {
            if (current.key !== key) {
                return { key, direction: 'asc' };
            }
            if (current.direction === 'asc') {
                return { key, direction: 'desc' };
            }
            return { key: null, direction: null };
        });
    };

    const getSortIcon = (key: SortKey) => {
        const isActive = sortConfig.key === key;
        
        if (!isActive) {
            return <UnfoldMoreIcon fontSize="small" className="sort-icon inactive" />;
        }
        
        if (sortConfig.direction === 'asc') {
            return <ExpandLessIcon fontSize="small" className="sort-icon active" />;
        }
        
        return <ExpandMoreIcon fontSize="small" className="sort-icon active" />;
    };

    const sortedTransports = useMemo(() => {
        if (!sortConfig.key || !sortConfig.direction) {
            return transports;
        }
        return [...transports].sort((a, b) => {
            let aVal: string | number;
            let bVal: string | number;
            
            if (sortConfig.key === 'priority') {
                aVal = a.priority;
                bVal = b.priority;
            } else if (sortConfig.key === 'status') {
                aVal = a.status;
                bVal = b.status;
            } else {
                aVal = new Date(a.assigned_timeframe).getTime();
                bVal = new Date(b.assigned_timeframe).getTime();
            }

            if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [transports, sortConfig]);

    return (
        <TableContainer 
            component={Paper} 
            className="transport-table-container"
            sx={{ 
                overflowX: 'auto',
                maxHeight: 'calc(100vh - 200px)',
                width: '100%'
            }}
        >
            <Table size="small" stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Pickup</TableCell>
                        <TableCell>Drop off</TableCell>
                        <TableCell 
                            className="sortable-header"
                            onClick={() => handleSort('assigned_timeframe')}
                        >
                            Assigned Date {getSortIcon('assigned_timeframe')}
                        </TableCell>
                        <TableCell 
                            className="sortable-header"
                            onClick={() => handleSort('priority')}
                        >
                            Priority {getSortIcon('priority')}
                        </TableCell>
                        <TableCell 
                            className="sortable-header"
                            onClick={() => handleSort('status')}
                        >
                            Status {getSortIcon('status')}
                        </TableCell>
                        <TableCell align="right"/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedTransports.map((t) => (
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