import { stringify } from "json5";
import React, {  createContext } from "react";
import { useState, useEffect } from "react";
import WordComponent from "./WordComponent";

const verbs = [
    "pleuvoir", 
    "asseoir", 
    "mourir", 
    "pleurer", 
    "accueillir",
    "aboyer"
]

const nouns = [
    "la réticence", 
    "la pénurie", 
    "le rendement", 
    "le procédé", 
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
    const [correctWord, setCorrectWord] = useState<string>("haha")
    const [currStatus, setCurrStatus] = useState<string>("going") // going, success, fail

    useEffect(()=>{
        if (currStatus === "success") {
            setCorrectWord("courage")
        }
    }, [currStatus])

    return (
        <div className="m-5">
            <WordContext.Provider value={{currStatus, setCurrStatus}}>
                <div>Current Status {currStatus}</div>
                <WordComponent correctWord={correctWord}/>
            </WordContext.Provider>
        </div>
    )


}