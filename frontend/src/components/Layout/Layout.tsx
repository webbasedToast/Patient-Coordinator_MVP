import {Outlet, useNavigate} from "react-router-dom";
import {
    AppBar,
    Box,
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

const DRAWER_WIDTH = 240;

export default function Layout() {
    const navigate = useNavigate();
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
                </Toolbar>
            </AppBar>

            <Drawer
                className="navbar"
                variant="permanent"
                sx={{
                    width: DRAWER_WIDTH,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: DRAWER_WIDTH,
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

                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate("/add-transport")}>
                                <ListItemIcon>
                                    <AddIcon />
                                </ListItemIcon>
                                <ListItemText primary="Add new Transport" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            <Box component="main" className="main-content">
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    )
}
