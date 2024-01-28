import React, { useCallback } from "react";
import { useState, useEffect, useContext} from "react";
import { WordContext } from "./WordPage";
import { INounCard } from "./Interface";

interface KeyboardEvent {
    key: string
}

export default function NounComponent({nounCard}: {nounCard: INounCard}) {
    const [userInput, setUserInput] = useState<string>()
    const {currStatus, setCurrStatus} = useContext(WordContext)

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === "Enter") {
            checkCorrectness()
            return
        }

    }, [userInput]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

  
    const checkCorrectness = () => {
        if (userInput === nounCard.word) {
            setUserInput("")
            setCurrStatus("success")
        } else {
            alert("Incorrect, try again!")
        }
        
        return 
    }

    return (
        <div >
            <p>debug user input is {userInput}</p>
            <div className="m-2 p-2 border-2 border-yellow-300 bg-yellow-200 rounded-md">
                <div className="text-lg">definition (noun) <span className="text-2xl">{nounCard.definition}</span></div>
            </div>
            <div className="m-2 flex flex-wrap border-2 border-stone-200 bg-stone-100 p-2 rounded-md"> 
            {
                nounCard.sentence.map((word, indexSent) => {
                    if (nounCard.fillIndex.includes(indexSent)) { // the worst logic possible, not very elegant 
                        return (
                            <input type="text" value = {userInput} className="bg-gray-300 border-b-8 border-gray-300 focus:border-blue-500" onChange={e => setUserInput(e.target.value)}/>
                        )
                    } else {
                        return (
                            <div key={indexSent} className="text-xl text-black ">{word}&nbsp;</div>
                        )
                    }
                    
                })
            }
            </div>        
        </div>
    )
}



// Solved my issue! 
// https://stackoverflow.com/questions/66213641/react-keypress-event-taking-only-initial-state-values-and-not-updated-values