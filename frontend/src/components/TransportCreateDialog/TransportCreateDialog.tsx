import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import dayjs from "dayjs";
import {createTransport} from "../../api/transports.ts";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select
} from "@mui/material";

import "./TransportCreateDialog.scss"
import {DatePicker} from "@mui/x-date-pickers";

const LOCATION_OPTIONS = [
    "STATION",
    "PATIENT_ROOM",
    "OP",
    "EMERGENCY_ROOM"
];

const PRIORITY_OPTIONS = [
    {label: "LOW", value: 0},
    {label: "MEDIUM", value: 1},
    {label: "HIGH", value: 2},
    {label: "URGENT", value: 3}
];

export default function TransportCreateDialog({ open, onClose }) {

    const queryClient = useQueryClient()
    const [pickup_location, setPickupLocation] = useState("")
    const [drop_off_location, setDropOffLocation] = useState("")
    const [priority, setPriority] = useState(0)
    const [assigned_timeframe, setAssignedTimeframe] = useState(dayjs())

    const createMutation = useMutation({
        mutationFn: createTransport,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["transports"] })
            onClose()
        }
    })

    function handleSubmit() {
        createMutation.mutate({
            pickup_location: pickup_location,
            drop_off_location: drop_off_location,
            priority: priority,
            assigned_timeframe: assigned_timeframe.toISOString()
        })
    }

    return (
        <Dialog open={open} onClose={onClose} className="transportCreateDialog">
            <DialogTitle>Create new Transport</DialogTitle>
            <DialogContent>

                <FormControl fullWidth>
                    <InputLabel>Pickup Location</InputLabel>
                    <Select
                        value={pickup_location}
                        label="Pickup Location"
                        onChange={event => setPickupLocation(event.target.value)}
                    >
                        {LOCATION_OPTIONS.map(l =>
                            <MenuItem key={l} value={l}>{l}</MenuItem>
                        )}
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel>Drop Off Location</InputLabel>
                    <Select
                        value={drop_off_location}
                        label="Drop Off Location"
                        onChange={event => setDropOffLocation(event.target.value)}
                    >
                        {LOCATION_OPTIONS.map(l =>
                            <MenuItem key={l} value={l}>{l}</MenuItem>
                        )}
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <DialogTitle className="priority-label">Priority</DialogTitle>
                    <RadioGroup
                        value={priority}
                        onChange={event => setPriority(Number(event.target.value))}
                    >
                        {PRIORITY_OPTIONS.map(p =>
                            <FormControlLabel
                                key={p.value}
                                value={p.value}
                                control={<Radio/>}
                                label={p.label}
                            />
                        )}
                    </RadioGroup>
                </FormControl>

                <DatePicker
                    label="Assigned Date"
                    value={assigned_timeframe}
                    onChange={(newValue) => setAssignedTimeframe(newValue)}
                    format="DD/MM/YYYY"
                />

            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit}>Confirm</Button>
            </DialogActions>
        </Dialog>
  )
}
