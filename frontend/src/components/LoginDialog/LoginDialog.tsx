import {useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup
} from "@mui/material";

import "./LoginDialog.scss";

interface LoginDialogProps {
    open: boolean;
    onClose: () => void;
    onLogin: (role: 'admin' | 'dienstleister') => void;
    currentRole: 'admin' | 'dienstleister' | null;
}

export default function LoginDialog({open, onClose, onLogin, currentRole}: LoginDialogProps) {
    const [selectedRole, setSelectedRole] = useState<'admin' | 'dienstleister' | ''>('');

    const handleLogin = () => {
        if (selectedRole === 'admin' || selectedRole === 'dienstleister') {
            onLogin(selectedRole);
            setSelectedRole('');
            onClose();
        }
    };

    const handleClose = () => {
        setSelectedRole('');
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} className="login-dialog">
            <DialogTitle>
                {currentRole ? 'Change Role' : 'Login'}
            </DialogTitle>
            <DialogContent>
                <FormControl component="fieldset">
                    <RadioGroup
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value as 'admin' | 'dienstleister')}
                    >
                        <FormControlLabel
                            value="admin"
                            control={<Radio />}
                            label="Admin"
                        />
                        <FormControlLabel
                            value="dienstleister"
                            control={<Radio />}
                            label="Dienstleister"
                        />
                    </RadioGroup>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button 
                    variant="contained" 
                    onClick={handleLogin}
                    disabled={!selectedRole}
                >
                    Login
                </Button>
            </DialogActions>
        </Dialog>
    )
}
