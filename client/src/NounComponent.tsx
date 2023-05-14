import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import { WordContext } from "./WordPage";
import { NounCard } from "./Interface";

interface KeyboardEvent {
    key: string
}

export default function NounComponent({nounCard}: {nounCard: NounCard}) {
    const [userTyped, setUserTyped] = useState<Array<String>>([])
    const {currStatus, setCurrStatus} = React.useContext(WordContext)

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === "Meta" || event.key === "Shift") {
            return 
        }
        if (event.key === "Backspace") {
            setUserTyped(userTyped.slice(0, -1))
            return
        }
        if (event.key === "Enter") {
            checkCorrectness()
            return
        }
        // const newWord = [...word, event.key] // this commented snippet is not correct and I don't know why either
        // console.log("new word is ", newWord) 
        // setWord(newWord)
        setUserTyped((prevWord) => [...prevWord, event.key]) // this works 
    }, [userTyped]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    useEffect(() => {
        console.log("word is ", userTyped)
    }, [userTyped]);

    const checkCorrectness = () => {
        console.log("checking correctness" , userTyped)
        if (userTyped.join("") === nounCard.sentence[nounCard.fillIndex[0]]) {
            console.log("CORRECT!")
        }
        setUserTyped([])
        setCurrStatus("success")
        return 
    }

    const FillBlank = ({ word }: { word: string }) => {
        console.log("split word is ", word.split(""))
        return (
            <div className="flex flex-wrap">
                {
                    word.split("").map((letter, index) => {
                        return (
                            <div key={index} className="border-2 border-slate-400 w-6 m-px text-center text-2xl">{userTyped[index]}</div>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <div >
            <DefinitionCard definition={nounCard.definition}></DefinitionCard>
            <div className="m-2 flex flex-wrap border-2 border-stone-200 bg-stone-100 p-2 rounded-md"> 
            {
                nounCard.sentence.map((word, indexSent) => {
                    if (nounCard.fillIndex.includes(indexSent)) {
                        return (
                            <FillBlank word={word}></FillBlank>
                        )
                    } else {
                        return (
                            <div key={indexSent} className="text-xl text-black m-1">{ word }</div>
                        )
                    }
                    
                })
            }
            </div>        
        </div>
    )
}

const DefinitionCard = ({definition}: {definition: string}) => {
    return (
        <div className="m-2 p-2 border-2 border-yellow-300 bg-yellow-200 rounded-md">
            <div className="text-lg">definition (noun) <span className="text-2xl">{definition}</span></div>
        </div>
    )
}


// Solved my issue! 
// https://stackoverflow.com/questions/66213641/react-keypress-event-taking-only-initial-state-values-and-not-updated-values