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
import ListIcon from "@mui/icons-material/List";
import AddIcon from "@mui/icons-material/add";
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
                <Typography className="navbar-header">Navigation</Typography>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate("/transports")}>
                            <ListItemIcon>
                                <ListIcon />
                            </ListItemIcon>
                            <ListItemText primary="Transports" />
                        </ListItemButton>
                    </ListItem>

                    {role === "ADMIN" && (
                        <>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => navigate("/add-transport")}>
                                    <ListItemIcon>
                                        <AddIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Assign Transport" />
                                </ListItemButton>
                            </ListItem>

                            <Divider className="navbar-divider" />
                            <Typography className="navbar-header navbar-header-sm">User-Management</Typography>

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
