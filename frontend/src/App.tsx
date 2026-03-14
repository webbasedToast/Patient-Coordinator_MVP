import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import TransportsDashboard from "./pages/TransportsDashboard/TransportsDashboard.tsx";
import AddTransport from "./pages/AddTransport/AddTransport.tsx";
import AppLayout from "./components/Layout/AppLayout/AppLayout.tsx";
import {AuthProvider} from "./contexts/AuthContext.tsx";
import AddUser from "./pages/AddUser/AddUser.tsx";
import UserManagement from "./pages/UserManagement/UserManagement.tsx";

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
