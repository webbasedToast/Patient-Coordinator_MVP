import {useNavigate} from "react-router-dom";
import {
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import "./AppNavigation.scss";
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentAddIcon from '@mui/icons-material/AssignmentAdd';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import {useAuth} from "../../../contexts/AuthContext.tsx";

export default function AppNavigation() {
    const navigate = useNavigate();
    const {role} = useAuth();

    return (
        <Drawer
            className="navbar"
            variant="permanent"
        >
            <Toolbar />
            <Box className="navbar-content">
                <Typography variant="h6" className="navbar-header">Navigation</Typography>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate("/transports")}>
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Transports" />
                        </ListItemButton>
                    </ListItem>

                    {role === "ADMIN" && (
                        <>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => navigate("/add-transport")}>
                                    <ListItemIcon>
                                        <AssignmentAddIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Assign Transport" />
                                </ListItemButton>
                            </ListItem>

                            <Divider className="navbar-divider" />
                            <Typography variant="subtitle2" className="navbar-header">User-Management</Typography>

                            <ListItem disablePadding>
                                <ListItemButton onClick={() => navigate("/users")}>
                                    <ListItemIcon>
                                        <PeopleAltIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Show registered Users" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => navigate("/add-user")}>
                                    <ListItemIcon>
                                        <PersonAddIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Add new User" />
                                </ListItemButton>
                            </ListItem>
                        </>
                    )}
                </List>
            </Box>
        </Drawer>
    );
}
