import {Box, Toolbar} from "@mui/material";
import {Outlet} from "react-router-dom";
import "./PageContainer.scss";

export default function PageContainer() {
    return (
        <Box className="page-container">
            <Toolbar />
            <Outlet />
        </Box>
    );
}
