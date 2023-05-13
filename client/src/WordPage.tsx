import { stringify } from "json5";
import React, { KeyboardEventHandler, useCallback } from "react";
import { useState, useEffect } from "react";

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

interface KeyboardEvent{
    key: string
}

export default function WordComponent() {
    const [correctWord, setCorrectWord] = useState<string>("courage")
    const [word, setWord] = useState<Array<String>>([])
    const typedLetters: Array<String> = []

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);



    const handleKeyDown = (event: KeyboardEvent) => {
        console.log('Key down:', event.key);
        if (event.key === "Backspace") {
            setWord((prevArray)=>prevArray.slice(0, -1))
            return 
        }
        setWord((prevArray)=>[...prevArray, event.key])
        console.log(stringify(word))
    };
 
   

    return (
        <div className="m-10 flex">
            <div>courage</div>
            {
                correctWord.split("").map((letter, index) => {
                    return (
                    <div>
                        <div className="border-2 border-blue-800 w-10 h-10 m-1 text-center">{word[index]}</div>
                    </div>)
                })
            }
        </div>
        
    )

}