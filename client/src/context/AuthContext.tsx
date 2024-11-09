import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axiosConfig from '../axiosConfig';

interface AuthContextType {
    user_id: string | null;
    error: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user_id: null,
    error: null,
    loading: true,
    login: async (email: string, password: string) => {}
});

export const AuthProvider = ({children}:{children: ReactNode}) => {
    const [user_id, setUserID] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // check auth status on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axiosConfig.get('/api/auth/me');
                console.log("auth provider useEffect", res.data);
                setUserID(res.data.user_id);
            } catch (err) {
                setUserID(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);


    const login = async(email:string, password:string) => {
        try{
            const res = await axiosConfig.post("/api/auth/login", {
                email, 
                password
            }, {
                withCredentials: true
            });
            setUserID(res.data.user_id);
            setError(null);
            console.log("login success", res.data);
        } catch (err: any) {
            setError(err.response?.data?.message || "An error occurred")
        }
    };

    return (
        <AuthContext.Provider
        value = {{
            user_id, 
            error,
            loading,
            login
        }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext);