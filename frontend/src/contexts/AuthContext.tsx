import {createContext, type ReactNode, useContext, useEffect, useState} from "react";

type Role = 'ADMIN' | 'BASIC_USER' | null;

interface AuthContextType {
    role: Role;
    userName: string | null;
    login: (role: Role, userName: string) => void;
    logout: () => void;
    isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY_ROLE = 'auth_role';
const STORAGE_KEY_USERNAME = 'auth_username';

export function AuthProvider({children}: {children: ReactNode}) {
    const [role, setRole] = useState<Role>(() => {
        const stored = localStorage.getItem(STORAGE_KEY_ROLE);
        if (stored === 'ADMIN' || stored === 'BASIC_USER') {
            return stored;
        }
        return null;
    });

    const [userName, setUserName] = useState<string | null>(() => {
        return localStorage.getItem(STORAGE_KEY_USERNAME);
    });

    useEffect(() => {
        if (role) {
            localStorage.setItem(STORAGE_KEY_ROLE, role);
        } else {
            localStorage.removeItem(STORAGE_KEY_ROLE);
        }
    }, [role]);

    useEffect(() => {
        if (userName) {
            localStorage.setItem(STORAGE_KEY_USERNAME, userName);
        } else {
            localStorage.removeItem(STORAGE_KEY_USERNAME);
        }
    }, [userName]);

    const login = (newRole: Role, newUserName: string) => {
        setRole(newRole);
        setUserName(newUserName);
    };

    const logout = () => {
        setRole(null);
        setUserName(null);
    };

    return (
        <AuthContext.Provider value={{
            role,
            userName,
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
