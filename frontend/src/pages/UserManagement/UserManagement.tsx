import {useAuth} from "../../contexts/AuthContext.tsx";
import {Box} from "@mui/material";
import UsersTable from "../../components/UsersTable/UsersTable.tsx";

export default function UserManagement() {
    const {role} = useAuth();
    const canDelete = role === 'ADMIN';

    return (
        <Box className="user-management">
            <UsersTable canDelete={canDelete}/>
        </Box>
    )
}
