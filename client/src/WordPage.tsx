import React, {  createContext } from "react";
import { useState, useEffect } from "react";
import {ICard, IVerbCard, IConjugateCard} from "./Interface";
import NounComponent from "./NounComponent";
import { VerbComponent, ConjugateComponent } from "./VerbComponent";
import { ProgressBar } from "./ProgressBar";
import Title from "./NavBar";
import { nouns, conjugates, verbs} from "./Data";
import axios from "axios";


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
    const [cards, setCards] = useState<ICard[]>(conjugates)
    const [cardIndex, setCardIndex] = useState<number>(0)
    const [currCard, setCurrCard] = useState<ICard>(cards[0] as ICard)
    const [currStatus, setCurrStatus] = useState<string>("going") // going, success, fail, finished
    
    console.log("\n\n_________Initialization", conjugates.length)
    // TODO: fetch data from backend
    // FIXME: start from here next time
    // useEffect( () => {
        
    //     try {
    //         const response = await axios.get<string[]>('https://localhost:8000');
    //         console.log(response.data);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }, [])

    useEffect(()=>{
        if (currStatus === "success") { 
            if (cardIndex === cards.length - 1) {
                setCurrStatus("finished")
                return 
            }
            const newCardIndex = cardIndex + 1
            console.log("useEffect updated once", newCardIndex)
            setCardIndex(newCardIndex)
            setCurrCard(cards[newCardIndex] as IConjugateCard)
            setCurrStatus("going")
        }
    }, [currStatus, cardIndex, currCard, cards])

   
    return (
        <div className="m-5 justify-center">
            <Title />
            <WordContext.Provider value={{ currStatus, cardIndex, totalCardCount: cards.length, setCurrStatus}}>
                {
                    currStatus === "finished" ?
                        <div className="text-4xl text-center">You have finished all the words!</div> 
                    :
                        <div className="w-2/3 m-auto">
                        <ProgressBar />
                        <ConjugateComponent conjugateCard={currCard as IConjugateCard} />
                    </div>
                }

            </WordContext.Provider>
            <VerbComponent verbCard={verbs[0]} />

        </div>
    )


}