import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axiosConfig from '../axiosConfig';

interface AuthContextType {
    user_id: string | null;
    error: string | boolean;
    loading: boolean;
    role: string;
    login: (email: string, password: string) => Promise< boolean>;
    signup: (userForm: any) => Promise< boolean>;
}

const AuthContext = createContext<AuthContextType>({
    user_id: null,
    error: false,
    loading: true,
    role: "admin", // notloggedin, user, admin
    login: async (email: string, password: string) => {return false},
    signup: async (userForm: any) => {return false}
});

export const AuthProvider = ({children}:{children: ReactNode}) => {
    const [user_id, setUserID] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | boolean>(false);
    const [role, setRole] = useState<string>("admin");
    // check auth status on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axiosConfig.get('/me', {
                    withCredentials: true
                });
                setUserID(res.data.user._id);
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
                setUserID(res.data.user._id)
                setError(res.data.message)
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

    const signup = async (userForm: any) => {
        try{
            setLoading(true);
            const res = await axiosConfig.post("/signup", userForm);
            if (res.status === 201 && res.data.success) {
                setUserID(res.data.user._id)
                setError(false)
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
    }

    return (
        <AuthContext.Provider
        value = {{
            user_id, 
            error,
            loading,
            role,
            login,
            signup
        }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext);