import {useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Alert
} from "@mui/material";

import "./LoginDialog.scss";
import {loginUser} from "../../api/users.ts";

interface LoginDialogProps {
    open: boolean;
    onClose: () => void;
    onLogin: (role: 'ADMIN' | 'BASIC_USER', userName: string) => void;
    currentRole: 'ADMIN' | 'BASIC_USER' | null;
}

export default function LoginDialog({open, onClose, onLogin, currentRole}: LoginDialogProps) {
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!userName.trim()) {
            setError('Please enter a username');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const user = await loginUser(userName.trim());
            onLogin(user.user_type as 'ADMIN' | 'BASIC_USER', user.user_name);
            setUserName('');
            onClose();
        } catch (err) {
            setError('User not found. Please check the username.');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setUserName('');
        setError('');
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} className="login-dialog">
            <DialogTitle>
                {currentRole ? 'Change User' : 'Login'}
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Username"
                    fullWidth
                    variant="outlined"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    disabled={loading}
                />
                {error && (
                    <Alert severity="error" sx={{mt: 2}}>
                        {error}
                    </Alert>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button 
                    variant="contained" 
                    onClick={handleLogin}
                    disabled={loading || !userName.trim()}
                >
                    Login
                </Button>
            </DialogActions>
        </Dialog>
    )
}
