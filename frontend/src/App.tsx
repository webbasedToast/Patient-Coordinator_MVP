import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import AddTransport from "./pages/AddTransport/AddTransport.tsx";
import Layout from "./components/Layout/Layout.tsx";
import {AuthProvider} from "./contexts/AuthContext.tsx";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/transports" replace />} />
                    <Route element={<Layout />}>
                        <Route path="/transports" element={<Dashboard />} />
                        <Route path="/add-transport" element={<AddTransport />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
