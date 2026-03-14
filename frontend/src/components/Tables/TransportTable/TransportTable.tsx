import type {TransportRequest} from "../../../types/TransportRequest.ts";
import {
    Chip,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TablePaginationActions from "../TablePaginationActions/TablePaginationActions.tsx";

import {fetchTransports} from "../../../api/transports.ts";
import {useQuery} from "@tanstack/react-query";
import * as React from "react";
import {useState} from "react";
import {useAuth} from "../../../contexts/AuthContext.tsx";
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
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());

    return `${day}.${month}.${year}`;
}

function priorityLabel(priority: number) {
    return ["Low", "Medium", "High", "Urgent"][priority] ?? "-";
}

export default function TransportTable({onEdit, canEdit = false}: Props) {
    const {role, userName} = useAuth();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: null });

    const assignedService = role === 'BASIC_USER' ? userName ?? undefined : undefined;

    const {data: response, isLoading} = useQuery({
        queryKey: ["transports", page, rowsPerPage, sortConfig, assignedService],
        queryFn: () => fetchTransports(
            page + 1,
            rowsPerPage,
            sortConfig.key ?? undefined,
            sortConfig.direction ?? undefined,
            assignedService
        )
    });

    const transports = response?.data ?? [];

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

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper className="transport-table-container">
            <TableContainer className="transport-table-scroll">
                <Table size="small" stickyHeader className="transport-table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="col-service">Assigned Service</TableCell>
                            <TableCell className="col-pickup">Pickup</TableCell>
                            <TableCell className="col-dropoff">Drop off</TableCell>
                            <TableCell className="col-due-date sortable-header" onClick={() => handleSort('assigned_timeframe')}>
                                Due Date {getSortIcon('assigned_timeframe')}
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
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">Loading...</TableCell>
                            </TableRow>
                        ) : transports.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">No transports found</TableCell>
                            </TableRow>
                        ) : (
                            transports.map((t) => (
                                <TableRow key={t.id} hover>
                                    <TableCell className="col-service">{t.assigned_service}</TableCell>
                                    <TableCell className="col-pickup">{t.pickup_location}</TableCell>
                                    <TableCell className="col-dropoff">{t.drop_off_location}</TableCell>
                                    <TableCell className="col-due-date">{formatDate(t.assigned_timeframe)}</TableCell>
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
                            ))
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                count={response?.total ?? 0}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                rowsPerPageOptions={[5, 10]}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Paper>
    )
}
