import { useAuth } from '../context/AuthContext';
import logo from "../assets/logo.png"
import { useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon, StudyIcon, AddIcon, DeckIcon, LoginIcon, SignupIcon } from './Icons';

const NavbarRoleBased = () => {
    const { role, username} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;


    return (
        <nav className="bg-gray-100 shadow-sm">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="flex items-center h-14">
                    {/* Logo/Brand */}
                    <div className="flex items-center text-gray-700 font-semibold text-lg mr-8"
                        onClick={() => navigate('/')}>
                        <img src={logo} alt="Logo" className="h-6 w-6 mr-2" />
                        <span >vocabloom</span>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-1 justify-between">
                        {/* User Links */}
                        <div className="flex space-x-1">
                            <a 
                                onClick={() => navigate('/dashboard')}
                                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium 
                                    ${currentPath === '/dashboard' 
                                        ? 'bg-yellow-100 text-gray-900' 
                                        : 'text-gray-600 hover:bg-yellow-50 hover:text-gray-900'} 
                                    transition-colors cursor-pointer`}
                            >
                                <HomeIcon />
                                Home
                            </a>

                            <a
                                onClick={() => navigate('/cards2')}
                                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium 
                                    ${currentPath === '/cards2'
                                        ? 'bg-yellow-100 text-gray-900'
                                        : 'text-gray-600 hover:bg-yellow-50 hover:text-gray-900'} 
                                    transition-colors cursor-pointer`}
                            >
                                <StudyIcon />
                                Study
                            </a>

                            <a
                                onClick={() => navigate('/signup')}
                                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium 
                                        ${currentPath === '/signup'
                                        ? 'bg-yellow-100 text-gray-900'
                                        : 'text-gray-600 hover:bg-yellow-50 hover:text-gray-900'} 
                                        transition-colors cursor-pointer`}
                            >
                                <SignupIcon />
                                Signup
                            </a>

                            <a
                                onClick={() => navigate('/login')}
                                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium 
                                        ${currentPath === '/login'
                                        ? 'bg-yellow-100 text-gray-900'
                                        : 'text-gray-600 hover:bg-yellow-50 hover:text-gray-900'} 
                                        transition-colors cursor-pointer`}
                            >
                                <LoginIcon />
                                Login
                            </a>
                        </div>

                        {/* Admin Links */}
                        {role === "admin" && (
                            <div className="flex space-x-1">
                                <a
                                    onClick={() => navigate('/admin/addcard')}
                                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium 
                                        ${currentPath === '/admin/addcard'
                                            ? 'bg-yellow-100 text-gray-900'
                                            : 'text-gray-600 hover:bg-yellow-50 hover:text-gray-900'} 
                                        transition-colors cursor-pointer`}
                                >
                                    <AddIcon />
                                    Add Card
                                </a>

                                <a
                                    onClick={() => navigate('/admin/cards')}
                                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium 
                                        ${currentPath === '/admin/cards'
                                            ? 'bg-yellow-100 text-gray-900'
                                            : 'text-gray-600 hover:bg-yellow-50 hover:text-gray-900'} 
                                        transition-colors cursor-pointer`}
                                >
                                    <DeckIcon />
                                    Deck Management
                                </a>

                                <a
                                    onClick={() => navigate('/admin/deck')}
                                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium 
                                        ${currentPath === '/admin/deck'
                                            ? 'bg-yellow-100 text-gray-900'
                                            : 'text-gray-600 hover:bg-yellow-50 hover:text-gray-900'} 
                                        transition-colors cursor-pointer`}
                                >
                                    <AddIcon />
                                    Add Deck
                                </a>
                            </div>
                        )}
                    </div>
                        
                    <div className="flex items-center">
                        <span className="px-3 py-2 rounded-md text-sm font-semibold bg-yellow-200 text-gray-800">
                            {username}
                        </span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavbarRoleBased;