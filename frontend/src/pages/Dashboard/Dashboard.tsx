import {useState} from "react";
import TransportCreateDialog from "../../components/TransportCreateDialog/TransportCreateDialog.tsx";
import TransportEditDialog from "../../components/TransportEditDialog/TransportEditDialog.tsx";
import "./Dashboard.scss";
import {Button, Container, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/add";
import TransportTable from "../../components/TransportTable/TransportTable.tsx";

export default function Dashboard() {

    const [creating, setCreateOpen] = useState(false)
    const [editingTransport, setEditingTransport] = useState(null)

    return (
        <Container className="dashboard">
            <Typography variant="h4">Patient Transportation Coordinator Service</Typography>

            <Button
                startIcon={<AddIcon />}
                onClick={() => setCreateOpen(true)}
            >
                Add new Transport
            </Button>

            <TransportTable
                onEdit={(transport) => setEditingTransport(transport)}
            />

            <TransportCreateDialog
                open={creating}
                onClose={() => setCreateOpen(false)}
            />

            <TransportEditDialog
                transport={editingTransport}
                open={editingTransport != null}
                onClose={() => setEditingTransport(null)}
            />
        </Container>
    )
}
