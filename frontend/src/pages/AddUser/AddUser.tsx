import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {addUser} from "../../api/users.ts";
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    Paper,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";

import "./AddUser.scss";

const USER_TYPE_OPTIONS = [
    {label: "Basic User", value: "BASIC_USER"},
    {label: "Admin", value: "ADMIN"}
];

export default function AddUser() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [user_name, setUserName] = useState("")
    const [user_type, setUserType] = useState("BASIC_USER")

    const createMutation = useMutation({
        mutationFn: addUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] })
            navigate("/users")
        },
        onError: (error) => {
            console.error("Failed to create user:", error)
            alert("Failed to create user. Please check all fields.")
        }
    })

    function handleSubmit() {
        if (!user_name.trim()) {
            alert("Please enter a username")
            return
        }
        createMutation.mutate({
            user_name: user_name.trim(),
            user_type: user_type as "BASIC_USER" | "ADMIN"
        })
    }

    return (
        <Box className="add-user">
            <Paper className="form-container">
                <Typography variant="h5" className="form-title">
                    Create new User
                </Typography>

                <TextField
                    label="Username"
                    value={user_name}
                    onChange={(e) => setUserName(e.target.value)}
                    fullWidth
                    required
                />

                <FormControl fullWidth>
                    <Typography className="user-type-label">User Type</Typography>
                    <RadioGroup
                        value={user_type}
                        onChange={(event) => setUserType(event.target.value)}
                        row
                    >
                        {USER_TYPE_OPTIONS.map(p =>
                            <FormControlLabel
                                key={p.value}
                                value={p.value}
                                control={<Radio/>}
                                label={p.label}
                            />
                        )}
                    </RadioGroup>
                </FormControl>

                <Box className="form-actions">
                    <Button variant="outlined" onClick={() => navigate("/users")}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleSubmit}>
                        Create User
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}
