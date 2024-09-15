
import React, { KeyboardEvent, useState, useContext, useEffect, useRef } from "react";
import { WordContext } from "../../pages/CardPage";
import { IConjugateCard } from "../../interfaces/cardsInterface";

export default function ConjugateComponent({ conjugateCard }: { conjugateCard: IConjugateCard }) {
    const [userInput, setUserInput] = useState<string[]>(["", "", "", "", "", ""])
    const { currStatus, setCurrStatus } = useContext(WordContext)
    const subjects = ["Je", "Tu", "Il/Elle/On", "Nous", "Vous", "Ils/Elles"]
    const input1Ref = useRef<HTMLInputElement>(null)
    const input2Ref = useRef<HTMLInputElement>(null)
    const input3Ref = useRef<HTMLInputElement>(null)
    const input4Ref = useRef<HTMLInputElement>(null)
    const input5Ref = useRef<HTMLInputElement>(null)
    const input6Ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        input1Ref.current && input1Ref.current.focus();
    }, [])

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, nextInputRef: React.RefObject<HTMLInputElement>, index: number) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (index === 5) {
                checkCorrectness()
                return
            }
            nextInputRef.current && nextInputRef.current.focus();
        }
        if (e.key === "Tab") {
            e.preventDefault();
            nextInputRef.current && nextInputRef.current.focus();
            handleChange(userInput[index], index + 1)
        }
    }

    const handleChange = (newVal: string, index: number) => {
        const newInput = [...userInput]
        newInput[index] = newVal
        setUserInput(newInput)
    }
    const checkCorrectness = () => {
        for (let i = 0; i < 6; i++) {
            if (userInput[i] !== conjugateCard.conjugations[i]) {
                setCurrStatus("fail")
                return
            }
        }
        console.log("correct")
        setCurrStatus("success")
        setUserInput(["", "", "", "", "", ""])
        input1Ref.current && input1Ref.current.focus();

        return
    }

    const INPUT_CLASSNAME = "ml-2 m-1 bg-gray-50 border-b-2 border-black focus:bg-gray-100"
    return (
        <div >
            <div className="m-2 p-2 border-2 border-yellow-300 bg-yellow-200 rounded-md">
                <div className="text-lg">definition: <span className="text-2xl">{conjugateCard.definition}</span></div>
            </div>
            <div className="m-2 p-2 border-2" >
                <div>
                    Je <input value={userInput[0]} ref={input1Ref} onKeyDown={(e) => handleKeyDown(e, input2Ref, 0)} onChange={(e) => handleChange(e.target.value, 0)} className={INPUT_CLASSNAME}></input>
                </div>
                <div>
                    Tu <input value={userInput[1]} ref={input2Ref} onKeyDown={(e) => handleKeyDown(e, input3Ref, 1)} onChange={(e) => handleChange(e.target.value, 1)} className={INPUT_CLASSNAME}></input>
                </div>
                <div>
                    Il/Elle/On <input value={userInput[2]} ref={input3Ref} onKeyDown={(e) => handleKeyDown(e, input4Ref, 2)} onChange={(e) => handleChange(e.target.value, 2)} className={INPUT_CLASSNAME}></input>
                </div>
                <div>
                    Nous <input value={userInput[3]} ref={input4Ref} onKeyDown={(e) => handleKeyDown(e, input5Ref, 3)} onChange={(e) => handleChange(e.target.value, 3)} className={INPUT_CLASSNAME}></input>
                </div>
                <div>
                    Vous <input value={userInput[4]} ref={input5Ref} onKeyDown={(e) => handleKeyDown(e, input6Ref, 4)} onChange={(e) => handleChange(e.target.value, 4)} className={INPUT_CLASSNAME}></input>
                </div>
                <div>
                    Ils/ Elles <input value={userInput[5]} ref={input6Ref} onKeyDown={(e) => handleKeyDown(e, input6Ref, 5)} onChange={(e) => handleChange(e.target.value, 5)} className={INPUT_CLASSNAME}></input>
                </div>
            </div>
        </div>
    )
}

