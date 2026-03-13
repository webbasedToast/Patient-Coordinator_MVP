import {useState} from "react";
import TransportEditDialog from "../../components/TransportEditDialog/TransportEditDialog.tsx";
import "./Dashboard.scss";
import {Container} from "@mui/material";
import TransportTable from "../../components/TransportTable/TransportTable.tsx";
import {useAuth} from "../../contexts/AuthContext.tsx";
import type {TransportRequest} from "../../types/TransportRequest.ts";

export default function Dashboard() {
    const {role} = useAuth();
    const [editingTransport, setEditingTransport] = useState<TransportRequest | null>(null)

    const canEdit = role === 'ADMIN' || role === 'BASIC_USER';

    return (
        <Container className="dashboard">
            <TransportTable
                canEdit={canEdit}
                onEdit={canEdit ? (transport) => setEditingTransport(transport) : undefined}
            />

            <TransportEditDialog
                transport={editingTransport}
                open={editingTransport != null}
                onClose={() => setEditingTransport(null)}
            />
        </Container>
    )
}
