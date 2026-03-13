import {Outlet, useNavigate} from "react-router-dom";
import {
    AppBar,
    Box,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import "./Layout.scss";
import ListIcon from "@mui/icons-material/List";
import AddIcon from "@mui/icons-material/add";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from "@mui/icons-material/Logout";

import {useAuth} from "../../contexts/AuthContext.tsx";
import {useState} from "react";
import LoginDialog from "../LoginDialog/LoginDialog.tsx";


const DRAWER_WIDTH = 240;

export default function Layout() {
    const navigate = useNavigate();
    const {role, isLoggedIn, login, logout} = useAuth();
    const [loginDialogOpen, setLoginDialogOpen] = useState(false);

    const handleLogin = () => {
        if (isLoggedIn) {
            logout();
            setLoginDialogOpen(true);
        } else {
            setLoginDialogOpen(true);
        }
    }

    return (
        <Box className="layout">
            <AppBar position="fixed" className="headband">
                <Toolbar className="headband-toolbar">
                    <Typography
                        variant="h6"
                        className="headband-title"
                        onClick={() => navigate("/")}
                    >
                        Patient Transportation Coordination Service
                    </Typography>
                    <Button
                        color="inherit"
                        className="login-button"
                        startIcon={isLoggedIn ? <LogoutIcon /> : <LoginIcon />}
                        onClick={handleLogin}
                    >
                        {isLoggedIn ? `Logout ${role}` : "Login"}
                    </Button>
                </Toolbar>
            </AppBar>

            <Drawer
                className="navbar"
                variant="permanent"
                sx={{
                    position: 'relative',
                    width: DRAWER_WIDTH,
                    flexShrink: 0,
                    height: '100vh',
                    '& .MuiDrawer-paper': {
                        position: 'relative',
                        width: DRAWER_WIDTH,
                        height: '100vh',
                        boxSizing: 'border-box',
                    },
                }}
            >
                <Toolbar />
                <Box className="navbar-content">
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate("/transports")}>
                                <ListItemIcon>
                                    <ListIcon />
                                </ListItemIcon>
                                <ListItemText primary="Transports" />
                            </ListItemButton>
                        </ListItem>

                        {role === "admin" && (
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => navigate("/add-transport")}>
                                    <ListItemIcon>
                                        <AddIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Add new Transport" />
                                </ListItemButton>
                            </ListItem>
                        )}
                    </List>
                </Box>
            </Drawer>

            <Box component="main" className="main-content">
                <Toolbar />
                <Outlet />
            </Box>

            <LoginDialog
                open={loginDialogOpen}
                onClose={() => setLoginDialogOpen(false)}
                onLogin={login}
                currentRole={role}
            />

        </Box>
    )
}
