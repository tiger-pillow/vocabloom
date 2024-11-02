import React from "react";
import logo from "../assets/logo.png"

const NavBar = () => {
    return (
        <nav className="bg-gray-200 w-full px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Left side links */}
                    <div className="flex space-x-4">
                        <a href="/" className="text-gray-600 hover:text-black">
                            Landing
                        </a>
                    <a href="/cards2" className="text-gray-600 hover:text-black">
                        Cards
                    </a>
                       
                    </div>

                    {/* Logo in the middle */}
                    <div className="flex justify-center items-baseline flex-grow">
                        <img src={logo} alt="Logo" className="h-8 w-8 pr-1" />
                    <div className="text-5xl font-extrabold leading-tight tracking-tight text-center">
                            vocabloom
                        </div> 
                    </div>

                    {/* Right side links */}
                    <div className="flex space-x-4">
                        <a href="/addcard" className="text-gray-600 hover:text-black">
                            add card
                        </a>
                        <a href="/admin/cards" className="text-gray-600 hover:text-black">
                            cards
                        </a>
                    </div>
                </div>
        </nav>
    );
};

export default NavBar;


