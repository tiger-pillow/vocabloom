import { useAuth } from '../context/AuthContext';
import logo from "../assets/logo.png"
import { useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon, StudyIcon, AddIcon, DeckIcon, LoginIcon, SignupIcon } from './Icons';
import { useState } from 'react';
const NavbarRoleBased = () => {
    const { role, username, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const [isOpen, setIsOpen] = useState(false);
  

    const NavLink = ({ path, currentPath, icon, text }: { path: string, currentPath: string, icon: React.ReactNode, text: string }) => (
        <a
            onClick={() => navigate(path)}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${currentPath === path ? 'bg-yellow-100 text-gray-900' : 'text-gray-600 hover:bg-yellow-50 hover:text-gray-900'} transition-colors cursor-pointer`}
        >
            {icon} {text}
        </a>
    );

    return (
        <nav className="bg-gray-100 shadow-sm">
            <div className="max-w-screen-xl mx-auto px-4 flex items-center h-14">
                    {/* Logo/Brand */}
                    <div className="flex items-center text-gray-700 font-semibold text-lg mr-8 hover:scale-110 transition-transform"
                        onClick={() => navigate('/')}>
                        <img src={logo} alt="Logo" className="h-6 w-6 mr-2" />
                        <span >vocabloom</span>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-1 justify-between">
                        {/* User Links */}
                        <div className="flex space-x-1">
                            <NavLink
                                path="/dashboard"
                                currentPath={currentPath}
                                icon={<HomeIcon />}
                                text="Home"
                            />
                            <NavLink
                                path="/cards2"
                                currentPath={currentPath}
                                icon={<StudyIcon />}
                                text="Study"
                            />
                        {/* Admin Links */}
                        {role === "admin" && (
                            <div className="flex space-x-1">
                                <NavLink
                                    path="/admin/cards"
                                    currentPath={currentPath}
                                    icon={<DeckIcon />}
                                    text="Deck Management"
                                />

                                <NavLink
                                    path="/admin/cards"
                                    currentPath={currentPath}
                                    icon={<DeckIcon />}
                                    text="Deck Management"
                                />

                                <NavLink
                                    path="/admin/deck"
                                    currentPath={currentPath}
                                    icon={<AddIcon />}
                                    text="Add Deck"
                                />

                            </div>
                        )}
                    </div>

                    {/* User Info */}
                    {role === "guest" ?
                        (<div className="flex space-x-1">
                        <NavLink
                        path="/signup"
                        currentPath={currentPath}
                        icon={<SignupIcon />}
                        text="Signup"
                        />
                        <NavLink
                            path="/login"
                            currentPath={currentPath}
                            icon={<LoginIcon />}
                            text="Login"
                        />
                        </div>)
                        :
                        (
                            <div className="flex items-center">
                                <span className="px-3 py-2 rounded-md text-sm font-semibold bg-yellow-200 text-black">
                                    {username}
                                </span>

                                <div className="relative ml-3">
                                    <button
                                        onClick={() => setIsOpen(!isOpen)}
                                        className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
                                    >
                                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {isOpen && (
                                        <div className="absolute right-0 mt-2 w-48 rounded shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                            <div className="py-1">
                                                <button
                                                    onClick={async () => {
                                                        await logout();
                                                        navigate('/login');
                                                    }}
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    } 
                    
                
                    </div>
            </div>
        </nav>
    );
};

export default NavbarRoleBased;