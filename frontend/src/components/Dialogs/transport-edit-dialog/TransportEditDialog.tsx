import {useEffect, useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";

import {updateTransportStatus} from "../../../api/transports.ts";
import type {TransportRequest} from "../../../types/TransportRequest.ts";

import "./TransportEditDialog.scss"
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField
} from "@mui/material";

const STATUS_OPTIONS = [
    "ASSIGNED",
    "IN_PROGRESS",
    "CLOSED",
    "CANCELLED"
];

interface Props {
    transport: TransportRequest | null;
    open: boolean;
    onClose: () => void;
}

export default function TransportEditDialog({
    transport,
    open,
    onClose
}: Props) {

    const queryClient = useQueryClient()
    const [status, setStatus] = useState("")
    const [initialLoad, setInitialLoad] = useState(false)

   useEffect(() => {
       if (transport) {
           setStatus(transport.status)
           setInitialLoad(true)
       }
   }, [transport])

    const updateTransport = useMutation({
        mutationFn: ({ id, status }: { id: string; status: string }) => 
            updateTransportStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["transports"]})
            setInitialLoad(false)
            onClose()
        },
        onError: (error) => {
            console.error("Failed to update transport status:", error)
            setInitialLoad(false)
        }
    })

    function handleSubmit() {
        if (transport?.id && status && initialLoad) {
            updateTransport.mutate({ id: transport.id, status })
        }
    }

    return (
        <Dialog className="transportEditDialog" open={open} onClose={onClose}>
            <DialogTitle>Edit Transport Status</DialogTitle>
            <DialogContent>
                <TextField
                    select
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    value={status}
                    label="Status"
                    onChange={event => setStatus(event.target.value)}
                >
                    {STATUS_OPTIONS.map(s =>
                        <MenuItem key={s} value={s}>{s}</MenuItem>
                    )}
                </TextField>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}
