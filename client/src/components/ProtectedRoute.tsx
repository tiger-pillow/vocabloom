import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user_id, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    // return user_id ? <>{children}</> :  
    return user_id ? <>{children}</> : <Navigate to="/login" />;
}