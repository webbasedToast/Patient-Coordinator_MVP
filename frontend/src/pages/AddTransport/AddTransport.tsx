import {useState} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import dayjs from "dayjs";
import {createTransport} from "../../api/transports.ts";
import {fetchBasicUsers, type User} from "../../api/users.ts";
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    MenuItem,
    Paper,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";

import "./AddTransport.scss";
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

export default function AddTransport() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [pickup_location, setPickupLocation] = useState("")
    const [drop_off_location, setDropOffLocation] = useState("")
    const [priority, setPriority] = useState(0)
    const [assigned_timeframe, setAssignedTimeframe] = useState(dayjs())
    const [assigned_service, setAssignedService] = useState("")

    const {data: basicUsers = []} = useQuery({
        queryKey: ["basicUsers"],
        queryFn: fetchBasicUsers
    })

    const createMutation = useMutation({
        mutationFn: createTransport,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["transports"] })
            navigate("/transports")
        },
        onError: (error) => {
            console.error("Failed to create transport:", error)
            alert("Failed to create transport. Please check all fields.")
        }
    })

    function handleSubmit() {
        if (!pickup_location || !drop_off_location || !assigned_service) {
            alert("Please select all required fields")
            return
        }
        createMutation.mutate({
            pickup_location: pickup_location as "STATION" | "PATIENT_ROOM" | "OP" | "EMERGENCY_ROOM",
            drop_off_location: drop_off_location as "STATION" | "PATIENT_ROOM" | "OP" | "EMERGENCY_ROOM",
            priority: priority as 0 | 1 | 2 | 3,
            assigned_timeframe: assigned_timeframe.toISOString(),
            assigned_service: assigned_service
        })
    }

    return (
        <Box className="add-transport">
            <Paper className="form-container">
                <Typography variant="h5" className="form-title">
                    Create new Transport
                </Typography>

                <FormControl fullWidth required>
                    <TextField
                        select
                        label="Pickup Location"
                        value={pickup_location}
                        onChange={event => setPickupLocation(event.target.value)}
                    >
                        <MenuItem value="" disabled>Pickup Location</MenuItem>
                        {LOCATION_OPTIONS.map(l =>
                            <MenuItem key={l} value={l}>{l}</MenuItem>
                        )}
                    </TextField>
                </FormControl>

                <FormControl fullWidth required>
                    <TextField
                        select
                        label="Drop Off Location"
                        value={drop_off_location}
                        onChange={event => setDropOffLocation(event.target.value)}
                    >
                        <MenuItem value="" disabled>Drop Off Location</MenuItem>
                        {LOCATION_OPTIONS.map(l =>
                            <MenuItem key={l} value={l}>{l}</MenuItem>
                        )}
                    </TextField>
                </FormControl>

                <FormControl fullWidth required>
                    <TextField
                        select
                        label="Assigend Transport Service"
                        value={assigned_service}
                        onChange={event => setAssignedService(event.target.value)}
                    >
                        <MenuItem value="" disabled>Assigned Service (User)</MenuItem>
                        {basicUsers.map((user: User) =>
                            <MenuItem key={user.id} value={user.user_name}>{user.user_name}</MenuItem>
                        )}
                    </TextField>
                </FormControl>

                <FormControl fullWidth>
                    <Typography className="priority-label">Priority</Typography>
                    <RadioGroup
                        value={priority}
                        onChange={event => setPriority(Number(event.target.value))}
                        row
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
                    label="Due Date"
                    value={assigned_timeframe}
                    onChange={(v) => setAssignedTimeframe(v || dayjs())}
                    format="DD/MM/YYYY"
                />

                <Box className="form-actions">
                    <Button variant="outlined" onClick={() => navigate("/transports")}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleSubmit}>
                        Create Transport
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}
