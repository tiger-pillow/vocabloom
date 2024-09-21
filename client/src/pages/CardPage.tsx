import { createContext } from "react";
import { useState, useEffect } from "react";
import {ICard} from "../interfaces/cardsInterface";
import {CardComponent} from "../components/cards/CardComponents";
import { ProgressBar } from "../components/ProgressBar";
import axiosConfig from "../axiosConfig";

type WordContextType = {
    currStatus: string,
    cardIndex: number, 
    totalCardCount: number,
    setCurrStatus: (status: string) => void
}
const WordContextDefault = {
    currStatus: "", 
    cardIndex: 0, 
    totalCardCount: 4, 
    setCurrStatus: (status: string) => {}
};
export const WordContext = createContext<WordContextType>(WordContextDefault)


export default function CardPage(){
    const [cards, setCards] = useState<ICard[]>()
    const [cardIndex, setCardIndex] = useState<number>(0)
    const [currCard, setCurrCard] = useState<ICard>()
    const [currStatus, setCurrStatus] = useState<string>("going") // going, success, fail, finished
  
    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axiosConfig.get("/vocablist");
                setCards(response.data)
                setCurrCard(response.data[0] as ICard)
                console.log("card page loading response.data", response.data)
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();

    }, [])

    useEffect(()=>{
        if (currStatus === "success" && cards) { 
            // Last card, deck finished 
            if (cardIndex === cards.length - 1) { 
                setCurrStatus("finished")
                return 
            }
            // Otherwise, move to next card
            const newCardIndex = cardIndex + 1
            setTimeout(() => {
                setCardIndex(newCardIndex)
                setCurrCard(cards[newCardIndex] as ICard)
                setCurrStatus("going")
            }, 1000)

        }
    }, [currStatus, cardIndex, currCard, cards])

   
    return (
        <div className="m-5 justify-center">
            {
                cards && currCard && <WordContext.Provider value={{ currStatus, cardIndex, totalCardCount: cards.length, setCurrStatus }}>
                    {
                        currStatus === "finished" ?
                            <div className="text-4xl text-center">You have finished all the words!</div>
                            :
                            <div className="w-2/3 m-auto">
                                <ProgressBar />
                                
                                {currStatus === "success" ? <div> ✅ Correct </div> : <div> </div>}
                                
                                <div className={`border-2 mt-8 ${currStatus === "going" ? "border-gray-500" : currStatus === "fail" ?  "border-red-500" : "border-green-500"}`}>
                                    <CardComponent card={currCard} />
                                </div>

                            </div>
                    }

                </WordContext.Provider>

            }
            
        </div>
    )


}