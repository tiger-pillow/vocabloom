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
            <div className="text-center px-2 py-2 mt-8">
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
    const DeckCard = (deck: {deck_name: string, deck_description: string, deck_size: number}) => {

        return (
            <div className="border rounded-lg shadow-sm">
                <button className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50 transition-colors">
                    <span className="font-medium">{deck.deck_name}</span>
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                <div className="px-4 py-3 border-t">
                    <p className="text-gray-600">{deck.deck_description}</p>
                    <div className="mt-2 text-sm text-gray-500">
                        <span>Deck size: &nbsp;{deck.deck_size}</span>
                    </div>
                </div>
            </div>
        )
        
    }


    return (
        <div>
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto">
                    <DeckCard 
                        deck_name="Dating Pack" 
                        deck_description="Flirt with your beau/belle in French" 
                        deck_size={50}
                    />
                </div>
            </div>
        </div>
    )

}

function ChooseRoutine(){
    return (
        <div>
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <div className="w-1/2 flex flex-col space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            New cards per day
                        </label>
                        <input
                            type="range"
                            min="3"
                            max="50"
                            defaultValue="10"
                            className="w-full h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>3</span>
                            <span>50</span>
                        </div>
                    </div>

                    <div className="w-1/2 flex flex-col space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Total Review Cards
                        </label>
                        <input
                            type="range"
                            min="25"
                            max="400"
                            defaultValue="100"
                            className="w-full h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>25</span>
                            <span>400</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}