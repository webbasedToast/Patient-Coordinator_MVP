import * as React from "react";
import {useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TablePaginationActions from "../TablePaginationActions/TablePaginationActions.tsx";

import "./UsersTable.scss";
import type {User} from "../../../types/User.ts";
import {deleteUser, fetchUsersPaginated} from "../../../api/users.ts";

interface Props {
    canDelete?: boolean;
    onDelete?: (user: User) => void;
}

export default function UsersTable({ canDelete = false, onDelete }: Props) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const { data: response, isLoading, refetch } = useQuery({
        queryKey: ["users", page, rowsPerPage],
        queryFn: () => fetchUsersPaginated(
            page + 1,
            rowsPerPage
        )
    });

    const deleteMutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            refetch();
        },
        onError: (error) => {
            console.error("Failed to delete user:", error);
            alert("Failed to delete user.");
        }
    });

    const handleDelete = (user: User) => {
        if (window.confirm(`Delete user "${user.user_name}"?`)) {
            deleteMutation.mutate(user.id);
            onDelete?.(user);
        }
    };

    const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper className="users-table-container">
            <TableContainer className="users-table-scroll">
                <Table size="small" stickyHeader className="user-table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="col-name">User Name</TableCell>
                            <TableCell className="col-role">Role</TableCell>
                            <TableCell className="col-actions" align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={3} align="center">Loading...</TableCell>
                            </TableRow>
                        ) : (response?.data ?? []).length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} align="center">No users found</TableCell>
                            </TableRow>
                        ) : (
                            (response?.data ?? []).map((u) => (
                                <TableRow key={u.id} hover>
                                    <TableCell className="col-name">{u.user_name}</TableCell>
                                    <TableCell className="col-role">{u.user_type}</TableCell>
                                    <TableCell className="col-actions" align="right">
                                        <Tooltip title="Admin Users can not be deleted">
                                            <IconButton
                                                onClick={() => handleDelete(u)}
                                                disabled={!canDelete || u.user_type === 'ADMIN'}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
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
