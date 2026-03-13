import {createContext, useContext, useState, useEffect, type ReactNode} from "react";

type Role = 'admin' | 'dienstleister' | null;

interface AuthContextType {
    role: Role;
    login: (role: Role) => void;
    logout: () => void;
    isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'auth_role';

export function AuthProvider({children}: {children: ReactNode}) {
    const [role, setRole] = useState<Role>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'admin' || stored === 'dienstleister') {
            return stored;
        }
        return null;
    });

    useEffect(() => {
        if (role) {
            localStorage.setItem(STORAGE_KEY, role);
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
    }, [role]);

    const login = (newRole: Role) => {
        setRole(newRole);
    };

    const logout = () => {
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{
            role,
            login,
            logout,
            isLoggedIn: role !== null
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
