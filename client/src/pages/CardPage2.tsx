import { useState, useEffect } from "react";
import { ICard } from "../interfaces/cardsInterface";
import { CardComponent } from "../components/cards/CardComponents";
import { ProgressBar } from "../components/cards/ProgressBar";
import axiosConfig from "../axiosConfig";
import { time } from "console";

const SHORTCUT_DICT = {
    "Digit1": "Hard",
    "Digit2": "Good",
    "Digit3": "Easy", 
    "Digit4": "Again", 
}

export default function CardPage2() {
    const [motherCard, setMotherCard] = useState<ICard>()
    const [id, setID] = useState(String)
    const timezone_offset = - new Date().getTimezoneOffset() / 60;


    const onFeedback = async (feedback: string) => {
        // send response to server, and get new card 
        console.log("onFeedback() ", feedback)
        const response = await axiosConfig.post("/getSessionCard", {
            childCard_id: id, 
            feedback: feedback
        })
        console.log("onFeedback() response \n", response)
        setMotherCard(response.data)
        
    }

    useEffect(()=>{
        const fetchData = async() => {
            try {
                const response = await axiosConfig.post("/getSessionCard",{
                    timezone_offset: timezone_offset
                }, {
                    withCredentials: true,
                });

                setMotherCard(response.data.motherCard as ICard)
                setID(response.data.childCard_id)
                console.log("card is ", response.data)
            } catch (err) {
                console.error(err);
            } 
        }
        fetchData()
    }, [])

    return (
        <div >
            <div className="mx-auto p-6 max-w-4xl">
                <ProgressBar totalCardCount={20} cardIndex={5} />
                {
                    motherCard === undefined ? <div></div> : 
                        <LearnCard card={motherCard as ICard} onFeedback={onFeedback} />
                }
            </div>
            
        </div>
    )
}

function LearnCard({ card, onFeedback, onStatus }: 
        { card: ICard, onFeedback: (feedback: string) => Promise<void>, onStatus?: () => Promise<void> | null}) {
        
        const [toggle, setToggle] = useState(0) 

        useEffect(() => {
            const handleKeyDown = (event: any) => {
                if (event.code === 'Space') {
                    setToggle((prev) => {if (prev===0){return 1 } else {return 0 }})
                } else if (["Digit1", "Digit2", "Digit3", "Digit4"].includes(event.code as string)){
                    var feedback = SHORTCUT_DICT[event.code as "Digit1" | "Digit2" | "Digit3" | "Digit4"]
                    onFeedback(feedback)
                }
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        }, [])
        
        return (
            <div className="m-2 mt-6">

                <div className="mb-6 p-4 border border-gray-300 bg-white rounded-lg">
                    <div className="text-lg font-medium text-gray-800">Word:
                        <span className="text-2xl font-semibold text-black ml-2">{card.word}</span>
                    </div>
                </div>

                {toggle === 1 ? (
                    <div>
                        <div className="mb-6 p-4 border border-gray-300 bg-white rounded-lg">
                            <div className="text-lg font-medium text-gray-800">Definition:
                                <span className="text-xl font-semibold text-black ml-2">{card.definition}</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4 mt-8">
                            <button className="bg-red-300 hover:bg-red-400 text-white font-bold py-2 px-6 rounded-md transition ease-in-out duration-200 transform hover:scale-105"
                                onClick={() => { onFeedback("hard") }}>
                                Hard
                            </button>
                            <button className="bg-yellow-200 hover:bg-yellow-300 text-gray-700 font-bold py-2 px-6 rounded-md transition ease-in-out duration-200 transform hover:scale-105"
                                onClick={() => { onFeedback("good") }}>
                                Good
                            </button>
                            <button className="bg-green-200 hover:bg-green-300 text-gray-700 font-bold py-2 px-6 rounded-md transition ease-in-out duration-200 transform hover:scale-105"
                                onClick={() => { onFeedback("easy") }}>
                                Easy
                            </button>
                            <button className="bg-purple-200 hover:bg-purple-300 text-gray-700 font-bold py-2 px-6 rounded-md transition ease-in-out duration-200 transform hover:scale-105"
                                onClick={() => { onFeedback("again") }}>
                                Again
                            </button>
                        </div>

                    </div>
                    
                ) : (
                    <div className="mb-6"></div>
                )}

                
            </div>

        )
}