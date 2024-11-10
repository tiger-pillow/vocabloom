import NavBar from "../components/NavBar"
import { useEffect, useState } from "react"
import axiosConfig from "../axiosConfig";
import { IDeck } from "../interfaces/cardsInterface";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignUpPage(){
    const { signup } = useAuth();
    const [decks, setDecks] = useState<IDeck[]>()
    const [userForm, setUserForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        deck_id: '', 
        new_cards_per_day: 10,
        total_review_cards: 100
    });
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                let decksResponse = await axiosConfig.get("/getDecks")
                setDecks(decksResponse.data)
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, [])


    const submitUserForm = async () => {
        // check input
        if(userForm.username === "" || userForm.email === "" || userForm.password === "" || 
            userForm.password !== userForm.confirmPassword
        ) {
            alert ('Please double check account information')
            return
        } else if (userForm.deck_id === ""){
            alert('Please select a deck of cards')
            return 
        } 
        // signup
        try {
            let response = await signup(userForm)
            if (response) {
                navigate('/cards2')
            } else {
                alert("signup error")
            }
        } catch (err) {
            console.error(err)
        }
    }

    const changeUserForm = (value: any) => {
        setUserForm( prev => ({
            ...prev,
            ...value
        }));
    }
 
    return (
        <div>
            <NavBar />
            <div className="container mx-auto p-4">
                <span className="text-left inline-block bg-white border border-yellow-500 text-black text-sm font-semibold px-3 py-1 rounded-md shadow-md">
                    Step 1: Create an account
                </span>
                <SignUp changeUserForm={changeUserForm} />
            </div>

            <div className="container mx-auto p-4">
                <span className="text-left inline-block bg-white border border-yellow-500 text-black text-sm font-semibold px-3 py-1 rounded-md shadow-md">
                    Step 2: Choose a deck
                </span>
                <ChooseDeck decks={decks || []} changeUserForm={changeUserForm} />

            </div>
            
            <div className="container mx-auto p-4">
                <span className="text-left inline-block bg-white border border-yellow-500 text-black text-sm font-semibold px-3 py-1 rounded-md shadow-md">
                    Step 3: Choose a routine
                </span>
                <ChooseRoutine changeUserForm={changeUserForm} />
            </div>

            <div className="text-center container mx-auto p-4 m-1 mb-12">
                <button className="inline-block bg-yellow-400 hover:bg-yellow-500 border border-yellow-300 text-black text-xl font-semibold px-3 py-1 rounded-md shadow-md"
                    onClick={submitUserForm}
                >
                    Let's go!
                </button>
            </div>
            
        </div>
    )
}

function SignUp({changeUserForm}: {changeUserForm: (value: any) => void}){
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedFormData = {
            ...formData,
            [name]: value
        };
        setFormData(updatedFormData);
        changeUserForm(updatedFormData);
    };

    return (
        <div>
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <input 
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        onChange={handleChange}
                        value={formData.username}
                    />
                    <input
                        type="email"
                        name="email" 
                        placeholder="Email"
                        className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        onChange={handleChange}
                        value={formData.email}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        onChange={handleChange}
                        value={formData.password}
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Password Confirmation"
                        className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        onChange={handleChange}
                        value={formData.confirmPassword}
                    />
                </div>
            </div>
        </div>
    )
}

function ChooseDeck({ decks, changeUserForm }: { decks: IDeck[], changeUserForm: (value: any) => void}){
    const [selectedDeck, setSelectedDeck] = useState<string>()

    const DeckCardComponent = (deck: IDeck) => {
        return (
            <div 
                className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
                    selectedDeck === deck._id ? 'bg-yellow-100 border-yellow-500' : 'bg-white hover:bg-gray-50'
                }`}
                onClick={() => {
                    setSelectedDeck(deck._id);
                    changeUserForm({ deck_id: deck._id });
                }}
            >
                <div className="flex flex-col">
                    <h3 className="font-semibold text-xl mb-2">{deck.deck_name}</h3>
                    <div className="text-md text-gray-600 mb-2">
                        {deck.deck_description}
                    </div>
                    <div className="text-sm text-gray-400 mb-2">size: &nbsp; {deck.deck_size}</div>
                    
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto">
                    {decks.map((deck) => DeckCardComponent(deck))}
                </div>
            </div>
        </div>
    )

}

function ChooseRoutine({changeUserForm}: {changeUserForm: (value: any) => void}){
    const [formData, setFormData] = useState({
        new_cards_per_day: 10,
        total_review_cards: 100
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedFormData = {
            ...formData,
            [name]: parseInt(value)
        };
        setFormData(updatedFormData);
        changeUserForm(updatedFormData);
    };
    return (
        <div>
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-2 gap-6">

                    <div className="w-3/4 flex flex-col space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            New cards per day: &nbsp; {formData.new_cards_per_day}
                        </label>
                        <input
                            type="range"
                            min="3"
                            max="50"
                            name="new_cards_per_day"
                            className="w-full h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                            onChange={handleChange}
                            value={formData.new_cards_per_day}
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>3</span>
                            <span>50</span>
                        </div>
                    </div>

                    <div className="w-3/4 flex flex-col space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Total Review Cards: &nbsp; {formData.total_review_cards}
                        </label>
                        <input
                            type="range"
                            min="25"
                            max="400"
                            name="total_review_cards"
                            className="w-full h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                            onChange={handleChange}
                            value={formData.total_review_cards}
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