import {useEffect, useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";

import {updateTransportStatus} from "../../api/transports.ts";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";

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
                <TextField
                    label="Status"
                    fullWidth
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit}>Confirm</Button>
            </DialogActions>
        </Dialog>
  )
}
