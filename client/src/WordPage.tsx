import React, {  createContext } from "react";
import { useState, useEffect } from "react";
import { NounCard, Card } from "./Interface";
import NounComponent from "./NounComponent";
import { ProgressBar } from "./ProgressBar";
import Title from "./NavBar";
import { nouns } from "./Data";


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
    const [correctCard, setCorrectCard] = useState<Card>(nouns[0])
    const [cardIndex, setCardIndex] = useState<number>(0)
    const [currStatus, setCurrStatus] = useState<string>("going") // going, success, fail
    const totalCardCount = nouns.length
    useEffect(()=>{
        if (currStatus === "success") {
            setCorrectCard(nouns[cardIndex + 1])
            setCardIndex(wordIndex => wordIndex + 1)
            setCurrStatus("going")
        }
    }, [currStatus, cardIndex])

    return (
        <div className="m-5 justify-center">
            <Title />
            <WordContext.Provider value={{currStatus, cardIndex, totalCardCount, setCurrStatus}}>
                <div className="w-2/3 m-auto">
                    <ProgressBar />
                    <NounComponent nounCard={correctCard as NounCard} /> 
                </div>
                
            </WordContext.Provider>
        </div>
    )


}