import {Outlet} from "react-router-dom";
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

const DRAWER_WIDTH = 240;

export default function Layout() {
    return (
        <Box className="layout">
            <AppBar position="fixed" className="headband">
                <Toolbar>
                    <Typography variant="h6">
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
                            <ListItemButton component="a" href="/transports">
                                <ListItemIcon>
                                    <ListIcon />
                                </ListItemIcon>
                                <ListItemText primary="Transports" />
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
