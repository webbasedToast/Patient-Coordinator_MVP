import {useNavigate} from "react-router-dom";
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import "./AppLayout.scss";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from "@mui/icons-material/Logout";

import {useAuth} from "../../../contexts/AuthContext.tsx";
import {useState} from "react";
import LoginDialog from "../../Dialogs/login-dialog/LoginDialog.tsx";
import PageContainer from "../page-container/PageContainer.tsx";
import AppNavigation from "../app-navigation/AppNavigation.tsx";

export default function AppLayout() {
    const navigate = useNavigate();
    const {isLoggedIn, login, logout} = useAuth();
    const [loginDialogOpen, setLoginDialogOpen] = useState(false);

    const handleLogin = () => {
        if (isLoggedIn) {
            logout();
            navigate("/");
        } else {
            setLoginDialogOpen(true);
        }
    }

    return (
        <Box className="layout">
            <AppBar position="fixed" className="headband">
                <Toolbar className="headband-toolbar">
                    <Typography
                        variant="h5"
                        className="headband-title"
                        onClick={() => navigate("/")}
                    >
                        Patient Transportation Coordination Service
                    </Typography>
                    <Button
                        color="inherit"
                        className="login-button"
                        endIcon={isLoggedIn ? <LogoutIcon /> : <LoginIcon />}
                        onClick={handleLogin}
                    >
                    </Button>
                </Toolbar>
            </AppBar>

            <AppNavigation />

            <PageContainer />

            <LoginDialog
                open={loginDialogOpen}
                onClose={() => setLoginDialogOpen(false)}
                onLogin={login}
            />

        </Box>
    )
}
