import { useAuth } from '../context/AuthContext';
import logo from "../assets/logo.png"
import { useLocation, useNavigate } from 'react-router-dom';

const NavbarRoleBased = () => {
    const { role } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    // Simple SVG icons as components
    const HomeIcon = () => (
        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    );

    const StudyIcon = () => (
        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
    );

    const AddIcon = () => (
        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
    );

    const DeckIcon = () => (
        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
    );

    const LoginIcon = () => (
        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <polyline points="10 17 15 12 10 7" />
            <line x1="15" y1="12" x2="3" y2="12" />
        </svg>
    );

    const SignupIcon = () => (
        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <line x1="20" y1="8" x2="20" y2="14" />
            <line x1="17" y1="11" x2="23" y2="11" />
        </svg>
    );



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
                                onClick={() => navigate('/')}
                                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium 
                                    ${currentPath === '/home' 
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
                </div>
            </div>
        </nav>
    );
};

export default NavbarRoleBased;