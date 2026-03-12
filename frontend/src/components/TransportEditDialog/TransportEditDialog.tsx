import {useEffect, useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";

import {updateTransportStatus} from "../../api/transports.ts";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";

import "./TransportEditDialog.scss"

const STATUS_OPTIONS = [
    "OPEN",
    "ASSIGNED",
    "IN_PROGRESS",
    "CLOSED",
    "CANCELLED"
];

export default function TransportEditDialog({
    transport,
    open,
    onClose
}) {

    const queryClient = useQueryClient()
    const [status, setStatus] = useState("")

   useEffect(() => {
       if (transport) {
           setStatus(transport.status)
       }
   }, [transport])

    const updateTransport = useMutation({
        mutationFn: () => updateTransportStatus(transport.id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["transports"]})
            onClose()
        }
    })

    function handleSubmit() {
        updateTransport.mutate()
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Transport Status</DialogTitle>
            <DialogContent>
                <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={status}
                        label="Status"
                        onChange={event => setStatus(event.target.value)}
                    >
                        {STATUS_OPTIONS.map(s =>
                            <MenuItem key={s} value={s}>{s}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit}>Confirm</Button>
            </DialogActions>
        </Dialog>
  )
}
