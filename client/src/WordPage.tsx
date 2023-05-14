import { stringify } from "json5";
import React, {  createContext } from "react";
import { useState, useEffect } from "react";
import WordComponent from "./WordComponent";
import { required } from "yargs";
import { NounCard, Card } from "./Interface";
import NounComponent from "./NounComponent";

const verbs = [
    "pleuvoir", 
    "asseoir", 
    "mourir", 
    "pleurer", 
    "accueillir",
    "aboyer"
]

const verbPair = [
    {
        explanation: "Start to do something", 
        verb: "commencer", 
        proposition1: "à", 
        object1: "faire qqch", 
        sentence: ["Finalement je ", "commence", " à ", "comprendre ce que ma Maman m'a dit."], 
        fillIndex: [1, 2]
    }, 
    {
        explanation: "Decided to do something",
        verb: "décider",
        proposition1: "de",
        object1: "faire qqch", 
        sentence: ["Le docteur m'a dit que je dois prendre soins de ma santé.", "Alors ", "je", "décide", " de ", "manger des fruits."], 
        fillIndex: [2, 3]
    }, 
    {
        explanation: "Teach someone to do soemthing ", 
        verb: "apprendre", 
        proposition1: "à",
        object1: "qqn", 
        proposition2: "à",
        object2: "faire qqch",
        sentence: ["Ma Maman ", "m'apprend", " à ", "faire du vélo."],
        fillIndex: [1, 2]
    }
]


const nouns: NounCard[] = [
    {
        type:"noun",
        definition: "reluctance",
        noun:"réticence", 
        gender: "la", 
        sentence: ["J'ai demandé une augmentation de salaire, mais ", "le patron ", " a ", "la réticence", " de me donner une réponse."],
        fillIndex: [3]
    },
    {
        type: "noun",
        definition: "shortage", 
        noun: "pénurie",
        gender: "la",
        sentence: ["Il y a ", "la pénurie", " de masques en France."],
        fillIndex: [1]
    }, 
    {
        type: "noun",
        definition: "yield", 
        noun: "rendement",
        gender: "le",
        sentence: ["Le rendement", " de la machine est très bon."],
        fillIndex: [0]

    }
]

const adjectives = [
    "délétère", 
    "raide", 
]

type WordContextType = {
    currStatus: string,
    setCurrStatus: (status: string) => void
}
const WordContextDefault = {
    currStatus: "", 
    setCurrStatus: (status: string) => {}
};
export const WordContext = createContext<WordContextType>(WordContextDefault)


export default function WordPage(){
    const [correctCard, setCorrectCard] = useState<Card>(nouns[0])
    const [cardIndex, setCardIndex] = useState<number>(0)
    const [currStatus, setCurrStatus] = useState<string>("going") // going, success, fail

    useEffect(()=>{
        if (currStatus === "success") {
            setCorrectCard(nouns[cardIndex + 1])
            setCardIndex(wordIndex => wordIndex + 1)
            setCurrStatus("going")
        }
    }, [currStatus, cardIndex])

    return (
        <div className="m-5 justify-center">
            <WordContext.Provider value={{currStatus, setCurrStatus}}>
                <div className="w-2/3 m-auto">
                    <NounComponent nounCard={correctCard as NounCard} /> 
                </div>
                
            </WordContext.Provider>
        </div>
    )


}