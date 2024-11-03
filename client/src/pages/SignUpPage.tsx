import NavBar from "../components/NavBar"

export default function SignUpPage(){

    return (
        <div>
            <NavBar />
            <div className="text-left px-4 py-2">
                <span className="inline-block bg-white border border-yellow-500 text-black text-sm font-semibold px-3 py-1 rounded-md shadow-md">
                    Step 1: Create Account
                </span>
            </div>
            <SignUp />
            <div className="text-left px-4 py-2">
                <span className="inline-block bg-white border border-yellow-500 text-black text-sm font-semibold px-3 py-1 rounded-md shadow-md">
                    Step 2: Choose a deck
                </span>
            </div>
            <ChooseDeck />
            <div className="text-left px-4 py-2">
                <span className="inline-block bg-white border border-yellow-500 text-black text-sm font-semibold px-3 py-1 rounded-md shadow-md">
                    Step 3: Choose a routine
                </span>
            </div>
            <ChooseRoutine />
            <div className="text-center px-2 py-2">
                <span className="inline-block bg-yellow-500 border border-yellow-300 text-black text-xl font-semibold px-3 py-1 rounded-md shadow-md">
                    Let's go!
                </span>
            </div>
            
        </div>
    )
}

function SignUp(){
    return (
        <div>
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <input 
                        type="text"
                        placeholder="Username"
                        className="p-2 mr-8 ml-8 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <input
                        type="email" 
                        placeholder="Email"
                        className="p-2  mr-8 ml-8 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="p-2  mr-8 ml-8  border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <input
                        type="password"
                        placeholder="Password Confirmation"
                        className="p-2  mr-8 ml-8  border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                </div>
            </div>
        </div>
    )
}

function ChooseDeck(){
    return (
        <div>
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto">
                    <div className="border rounded-lg shadow-sm">
                        <button className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50 transition-colors">
                            <span className="font-medium">5 cards/day</span>
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div className="px-4 py-3 border-t">
                            <p className="text-gray-600">Perfect for busy schedules. Learn at a steady pace.</p>
                            <div className="mt-2 text-sm text-gray-500">
                                <span>Time: ~10 min/day</span>
                            </div>
                        </div>
                    </div>

                    <div className="border rounded-lg shadow-sm">
                        <button className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50 transition-colors">
                            <span className="font-medium">10 cards/day</span>
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div className="px-4 py-3 border-t">
                            <p className="text-gray-600">Balanced approach for consistent progress.</p>
                            <div className="mt-2 text-sm text-gray-500">
                                <span>Time: ~20 min/day</span>
                            </div>
                        </div>
                    </div>

                    <div className="border rounded-lg shadow-sm">
                        <button className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50 transition-colors">
                            <span className="font-medium">15 cards/day</span>
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div className="px-4 py-3 border-t">
                            <p className="text-gray-600">For dedicated learners seeking faster results.</p>
                            <div className="mt-2 text-sm text-gray-500">
                                <span>Time: ~30 min/day</span>
                            </div>
                        </div>
                    </div>

                    <div className="border rounded-lg shadow-sm">
                        <button className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50 transition-colors">
                            <span className="font-medium">20 cards/day</span>
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div className="px-4 py-3 border-t">
                            <p className="text-gray-600">Intensive learning for rapid vocabulary growth.</p>
                            <div className="mt-2 text-sm text-gray-500">
                                <span>Time: ~40 min/day</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

function ChooseRoutine(){
    return (
        <div>
            <h1>Choose Routine</h1>
        </div>
    )
}