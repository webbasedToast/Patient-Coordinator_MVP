import {useState} from "react";
import TransportEditDialog from "../../components/TransportEditDialog/TransportEditDialog.tsx";
import "./Dashboard.scss";
import {Container} from "@mui/material";
import TransportTable from "../../components/TransportTable/TransportTable.tsx";
import {useAuth} from "../../contexts/AuthContext.tsx";

export default function Dashboard() {
    const {role} = useAuth();
    const [editingTransport, setEditingTransport] = useState(null)

    const canEdit = role === 'admin' || role === 'dienstleister';

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
