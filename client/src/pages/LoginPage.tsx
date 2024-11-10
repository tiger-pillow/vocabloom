import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

   
    const handleSubmit = async () => {
        console.log("login attempt with:", { email, password });
        const returnedRes = await login(email, password);
        if (returnedRes) {
            navigate('/cards2');
        } else {
            alert("login error");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 mt-1 border rounded-md bg-gray-100 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 mt-1 border rounded-md bg-gray-100 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-bold text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                        onClick={() => {
                            handleSubmit();
                        }}
                    >
                        Log In
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600">
                    Don't have an account? <a href="/signup" className="font-medium text-yellow-500 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
