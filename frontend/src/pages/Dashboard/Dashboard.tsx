import {useState} from "react";
import TransportEditDialog from "../../components/TransportEditDialog/TransportEditDialog.tsx";
import "./Dashboard.scss";
import {Container} from "@mui/material";
import TransportTable from "../../components/TransportTable/TransportTable.tsx";

export default function Dashboard() {

    const [editingTransport, setEditingTransport] = useState(null)

    return (
        <Container className="dashboard">
            <TransportTable
                onEdit={(transport) => setEditingTransport(transport)}
            />

            <TransportEditDialog
                transport={editingTransport}
                open={editingTransport != null}
                onClose={() => setEditingTransport(null)}
            />
        </Container>
    )
}
