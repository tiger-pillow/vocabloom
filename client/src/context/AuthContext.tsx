import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axiosConfig from '../axiosConfig';

interface AuthContextType {
    user_id: string | null;
    error: string | boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise< boolean>;
}

const AuthContext = createContext<AuthContextType>({
    user_id: null,
    error: false,
    loading: true,
    login: async (email: string, password: string) => {return false}
});

export const AuthProvider = ({children}:{children: ReactNode}) => {
    const [user_id, setUserID] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | boolean>(false);

    // check auth status on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axiosConfig.get('/me');
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
            setLoading(true);
            const res = await axiosConfig.post("/login", {
                email, 
                password
            }, {
                withCredentials: true
            });

            if (res.status === 200 && res.data.success) {
                await Promise.all([
                    setUserID(res.data.user._id),
                    setError(res.data.message)
                ]);
                return true
            } else {
                setError(res.data.message)
                return false
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "An error occurred")
            return false
        } finally {
            setLoading(false);
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