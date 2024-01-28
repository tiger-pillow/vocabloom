import React, {  createContext } from "react";
import { useState, useEffect } from "react";
import { INounCard, ICard, IVerbCard} from "./Interface";
import NounComponent from "./NounComponent";
import VerbComponent from "./VerbComponent";
import { ProgressBar } from "./ProgressBar";
import Title from "./NavBar";
import { nouns, verbs} from "./Data";


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


export default function WordPage(){
    const [cards, setCards] = useState<ICard[]>(verbs)
    const [cardIndex, setCardIndex] = useState<number>(0)
    const [currCard, setCurrCard] = useState<IVerbCard>(cards[0] as IVerbCard)
    const [currStatus, setCurrStatus] = useState<string>("going") // going, success, fail, finished
    const totalCardCount = nouns.length

    useEffect(()=>{
        if (currStatus === "success") {
            if (cardIndex === totalCardCount - 1) {
                setCurrStatus("finished")
                return 
            }
            const newCardIndex = cardIndex + 1
            console.log("useEffect updated once", newCardIndex)
            setCardIndex(newCardIndex)
            setCurrCard(cards[newCardIndex] as IVerbCard)
            setCurrStatus("going")
        }
    }, [currStatus, cardIndex, currCard])

   
    return (
        <div className="m-5 justify-center">
            <Title />
            <WordContext.Provider value={{currStatus, cardIndex, totalCardCount, setCurrStatus}}>
                {
                    currStatus === "finished" ?
                         <div className="text-4xl text-center">You have finished all the words!</div> 
                    : 
                        <div className="w-2/3 m-auto">
                        <ProgressBar />
                        {/* <NounComponent nounCard={correctCard as NounCard} /> */}
                        DEBUG cardindex is {cardIndex}
                        <div></div>
                        DEBUG currentCard is {currCard.word}
                        <div></div>
                        DEBUG status is {currStatus}
                        <VerbComponent verbCard={currCard as IVerbCard} />
                    </div>
                }
                
            </WordContext.Provider>
        </div>
    )


}