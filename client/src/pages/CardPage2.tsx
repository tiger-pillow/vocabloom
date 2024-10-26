import { createContext } from "react";
import { useState, useEffect } from "react";
import { ICard } from "../interfaces/cardsInterface";
import { CardComponent } from "../components/cards/CardComponents";
import { ProgressBar } from "../components/cards/ProgressBar";
import axiosConfig from "../axiosConfig";


export default function CardPage2() {
    const [card, setCard] = useState<ICard>()
    const [pageStatus, setPageStatus] = useState("")
    const [cardFeedback, setCardFeedback ] = useState("")

    const onFeedback = async (feedback: string) => {
        // send response to server, and get new card 
        console.log("onFeedback clicked ", feedback)
    }
    useEffect(()=>{
        const fetchData = async() => {
            try {
                const response = await axiosConfig.get("/userCards");
                setCard(response.data[0] as ICard)
                console.log("card is ", card)
            } catch (err) {
                console.error(err);
            } 
        }
        fetchData()
    }, [])

    return (
        <div>
            <ProgressBar totalCardCount={20} cardIndex={5} />
            {
                card === undefined ? <div></div> : 
                    <LearnCard card={card as ICard} onFeedback={onFeedback} />
            }
            
        </div>
    )
}

function LearnCard({ card, onFeedback, onStatus }: 
        { card: ICard, onFeedback: (feedback: string) => Promise<void>, onStatus?: () => Promise<void> | null}) {
        
        const [toggle, setToggle] = useState(0) 

        useEffect(() => {
            const handleKeyDown = (event: any) => {
                if (event.code === 'Space') {
                    console.log('Space bar was pressed!');
                    setToggle((prev) => {if (prev===0){return 1 } else {return 0 }})
                }
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        }, [])
        
        return (
            <div>
                <div className="m-2 mb-8 p-2 border-gray-300 bg-gray-200 rounded-md">
                    <div className="text-lg">definition (noun) <span className="text-2xl">{card.word}</span></div>
                </div>

                {toggle === 1 ? <div> {card.definition} </div> : <div></div>}

                <div className="flex space-x-4 justify-center m-10">
                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {onFeedback("Hard")} }>
                        Hard
                    </button>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => { onFeedback("Good") }}>
                        Good
                    </button>
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => { onFeedback("Easy") }}>
                        Easy
                    </button>
                    <button className="bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded"
                        onClick={() => { onFeedback("Again") }}>
                        Again
                    </button>
                </div>
            </div>
        )
}