import {useState} from "react";
import TransportEditDialog from "../../components/Dialogs/transport-edit-dialog/TransportEditDialog.tsx";
import "./TransportsDashboard.scss";
import {Box} from "@mui/material";
import TransportTable from "../../components/Tables/transport-table/TransportTable.tsx";
import {useAuth} from "../../contexts/AuthContext.tsx";
import type {TransportRequest} from "../../types/TransportRequest.ts";

export default function TransportsDashboard() {
    const {role} = useAuth();
    const [editingTransport, setEditingTransport] = useState<TransportRequest | null>(null)

    const canEdit = role === 'ADMIN' || role === 'BASIC_USER';

    return (
        <Box className="dashboard">
            <TransportTable
                canEdit={canEdit}
                onEdit={canEdit ? (transport) => setEditingTransport(transport) : undefined}
            />

            <TransportEditDialog
                transport={editingTransport}
                open={editingTransport != null}
                onClose={() => setEditingTransport(null)}
            />
        </Box>
    )
}
