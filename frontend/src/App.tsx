import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import TransportsDashboard from "./pages/transports-dashboard/TransportsDashboard.tsx";
import AddTransport from "./pages/add-transport/AddTransport.tsx";
import AppLayout from "./components/Layout/app-layout/AppLayout.tsx";
import {AuthProvider} from "./contexts/AuthContext.tsx";
import AddUser from "./pages/add-user/AddUser.tsx";
import UserManagement from "./pages/user-management/UserManagement.tsx";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/transports" replace />} />
                    <Route element={<AppLayout />}>
                        <Route path="/transports" element={<TransportsDashboard />} />
                        <Route path="/add-transport" element={<AddTransport />} />
                        <Route path="/users" element={<UserManagement />} />
                        <Route path="/add-user" element={<AddUser />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
