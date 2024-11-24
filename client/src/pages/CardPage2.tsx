import { useState, useEffect, useCallback } from "react";
import { ICard } from "../interfaces/cardsInterface";
import { ProgressBar } from "../components/cards/ProgressBar";
import axiosConfig from "../axiosConfig";
import { useNavigate } from "react-router-dom";

const SHORTCUT_DICT = {
    "Digit1": "Hard",
    "Digit2": "Good",
    "Digit3": "Easy", 
    "Digit4": "Again", 
    "Digit0": "Archive",
}

export default function CardPage2() {
    const [motherCard, setMotherCard] = useState<ICard>()
    const [childCardId, setChildCardId] = useState(String)
    const [sessionLog, setSessionLog] = useState(Object)
    const timezone_offset = - new Date().getTimezoneOffset() / 60;
    const navigate = useNavigate()

    // I think I know why, by passing in the childCardId, it is not updated, so it is still the previous childCardId


    const onFeedback = useCallback(async (feedback: string) => {
        // send response to server, and get new card 
        console.log("onFeedback() ", motherCard?.word, feedback, "childCardId", childCardId)
        const response = await axiosConfig.post("/getSessionCard", {
            sessionLog_id: sessionLog._id,
            childCard_id: childCardId, 
            feedback: feedback
        })
        console.log("onFeedback() response \n", response)
        if (response.data.message === "Success") {
            setMotherCard(response.data.motherCard as ICard)
            setChildCardId(response.data.childCard._id)
            setSessionLog(response.data.sessionLog)
        } else if (response.data.message === "Finished") {
            alert(response.data.message)
            console.log("Finished session, navigating to dashboard")
            navigate("/dashboard")
        }
    }, [motherCard?.word, childCardId, sessionLog])

    useEffect(()=>{
        const fetchData = async() => {
            try {
                const response = await axiosConfig.post("/getSessionCard",{
                    timezone_offset: timezone_offset
                }, {
                    withCredentials: true,
                });
                if (response.data.message === "Finished") {
                    alert(response.data.message)
                    console.log("Finished session, navigating to dashboard")
                    navigate("/dashboard")
                } else if (response.data.message === "Success") {
                    setMotherCard(response.data.motherCard as ICard)
                    setChildCardId(response.data.childCard._id)
                    setSessionLog(response.data.sessionLog)
                    console.log("Initial response data is ", response.data)
                }
            } catch (err) {
                console.error(err);
            } 
        }
        fetchData()
    }, [])

    return (
        <div >
            <div>
                DEBUG: 
                <span>childcard id: {childCardId} </span>
            </div>
           
            <div className="mx-auto p-6 max-w-4xl">
                <ProgressBar daily_limit={sessionLog.daily_limit} current_count={sessionLog.total_card_count} />
                {
                    motherCard === undefined ? <div></div> : 
                        <LearnCard key={childCardId} card={motherCard as ICard} onFeedback={onFeedback} />
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
            setToggle(0)

            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        }, [onFeedback, card.word])

        
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
                                onClick={() => { onFeedback("Hard") }}>
                                Hard
                            </button>
                            <button className="bg-yellow-200 hover:bg-yellow-300 text-gray-700 font-bold py-2 px-6 rounded-md transition ease-in-out duration-200 transform hover:scale-105"
                                onClick={() => { onFeedback("Good") }}>
                                Good
                            </button>
                            <button className="bg-green-200 hover:bg-green-300 text-gray-700 font-bold py-2 px-6 rounded-md transition ease-in-out duration-200 transform hover:scale-105"
                                onClick={() => { onFeedback("Easy") }}>
                                Easy
                            </button>
                            <button className="bg-purple-200 hover:bg-purple-300 text-gray-700 font-bold py-2 px-6 rounded-md transition ease-in-out duration-200 transform hover:scale-105"
                                onClick={() => { onFeedback("Again") }}>
                                Again
                            </button>
                        </div>


                        <div className="flex justify-end mt-16">
                            <button 
                                className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1 rounded border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                                onClick={() => { onFeedback("Archive") }}
                            >
                                Archive
                            </button>
                        </div>

                    </div>
                    
                ) : (
                    <div className="mb-6"></div>
                )}

                
            </div>

        )
}