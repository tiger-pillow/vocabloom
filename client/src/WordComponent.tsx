import { stringify } from "json5";
import React, { KeyboardEventHandler, useCallback } from "react";
import { useState, useEffect } from "react";
import { check } from "yargs";
import { WordContext } from "./WordPage";

interface KeyboardEvent {
    key: string
}

export default function WordComponent({correctWord}: {correctWord: string}) {
    const [word, setWord] = useState<Array<String>>([])
    const {currStatus, setCurrStatus} = React.useContext(WordContext)

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
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
    }, [word]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    useEffect(() => {
        console.log("word is ", word)
    }, [word]);

    const checkCorrectness = () => {
        console.log("checking correctness" , word)
        if (word.join("") === correctWord) {
            console.log("CORRECT!")
        }
        setWord([])
        setCurrStatus("success")
        return 
    }

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


// Solved my issue! 
// https://stackoverflow.com/questions/66213641/react-keypress-event-taking-only-initial-state-values-and-not-updated-values