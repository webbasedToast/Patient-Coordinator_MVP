import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";

import {createTransport} from "../../api/transports.ts";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";

export default function TransportCreateDialog({ open, onClose }) {

    const queryClient = useQueryClient()
    const [status, setStatus] = useState("waiting")

    const createMutation = useMutation({
        mutationFn: createTransport,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["transports"] })
            onClose()
        }
    })

    function handleSubmit() {
        createMutation.mutate({ status })
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create new Transport</DialogTitle>
            <DialogContent>
                <TextField
                    label="Status"
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
