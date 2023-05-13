import { stringify } from "json5";
import React, { KeyboardEventHandler, useCallback } from "react";
import { useState, useEffect } from "react";
import { check } from "yargs";

interface KeyboardEvent {
    key: string
}

export default function WordComponent() {
    const [correctWord, setCorrectWord] = useState<string>("courage")
    const [word, setWord] = useState<Array<String>>([])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        console.log("word is ", word)
    }, [word]);

    const checkCorrectness = () => {
        console.log("checking correctness" , word)
        if (word.join("") === correctWord) {
            console.log("CORRECT!")
        }
        return 
    }

     const handleKeyDown = (event: KeyboardEvent) => {
        console.log('Key down:', event.key)
        
        if (event.key === "Backspace") {
            setWord(word.slice(0, -1))
            return
        }
        if (event.key === "Enter") {
            checkCorrectness()
            return 
        }
        // const newWord = [...word, event.key] // this commented snippet is not correct and I don't know why either
        // console.log("new word is ", newWord) 
        // setWord(newWord)
        setWord((prevWord) => [...prevWord, event.key]) // this works 
    };

    return (
        <div>
            <div>courage</div>
            <br></br>
            <div>STATE IS {word}</div>
            <br></br>
            <div className="m-10 flex">
                {
                    correctWord.split("").map((letter, index) => {
                        return (
                            <div key={index}>
                                <div className="border-2 border-blue-800 w-10 h-10 m-1 text-center">{word[index]}</div>
                            </div>)
                    })
                }
            </div>
        </div>
    )
}
