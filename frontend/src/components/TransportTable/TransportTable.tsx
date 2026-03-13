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
    onEdit?: (transport: TransportRequest) => void;
    canEdit?: boolean;
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

export default function TransportTable({onEdit, canEdit = false}: Props) {

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
            <Table size="small" stickyHeader className="transport-table">
                <TableHead>
                    <TableRow>
                        <TableCell className="col-id">ID</TableCell>
                        <TableCell className="col-pickup">Pickup</TableCell>
                        <TableCell className="col-dropoff">Drop off</TableCell>
                        <TableCell className="col-date sortable-header" onClick={() => handleSort('assigned_timeframe')}>
                            Assigned Date {getSortIcon('assigned_timeframe')}
                        </TableCell>
                        <TableCell className="col-priority sortable-header" onClick={() => handleSort('priority')}>
                            Priority {getSortIcon('priority')}
                        </TableCell>
                        <TableCell className="col-status sortable-header" onClick={() => handleSort('status')}>
                            Status {getSortIcon('status')}
                        </TableCell>
                        <TableCell className="col-actions" align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedTransports.map((t) => (
                        <TableRow key={t.id} hover>
                            <TableCell className="col-id">{t.id}</TableCell>
                            <TableCell className="col-pickup">{t.pickup_location}</TableCell>
                            <TableCell className="col-dropoff">{t.drop_off_location}</TableCell>
                            <TableCell className="col-date">{formatDate(t.assigned_timeframe)}</TableCell>
                            <TableCell className="col-priority">{priorityLabel(t.priority)}</TableCell>
                            <TableCell className="col-status">
                                <Chip label={t.status} size="small"/>
                            </TableCell>
                            <TableCell className="col-actions" align="right">
                                <IconButton 
                                    onClick={() => canEdit && onEdit?.(t)}
                                    disabled={!canEdit}
                                >
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