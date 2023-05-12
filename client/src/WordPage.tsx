import React, { KeyboardEventHandler, useCallback } from "react";
import { useState } from "react";

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

export default function WordComponent() {
    const [correctWord, setCorrectWord] = useState<string>("courage")
    const [word, setWord] = useState<Array<String>>([])

    const handleKeyboard: KeyboardEventHandler<HTMLDivElement> = useCallback((eventName: KeyboardEvent) => {
        console.log(eventName.key)
    }, [])


    return (
        <div className="m-10 flex" onKeyDown={handleKeyboard}>
            {
            correctWord.split("").map((letter, index) => {
                return (
                <div className="border-2 border-blue-800 w-10 h-10 m-1 text-center">{letter}</div>)
            })
            }
        </div>
        
    )

}