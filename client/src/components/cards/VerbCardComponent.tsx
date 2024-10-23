import React, { KeyboardEvent, useState, useContext, useEffect, useRef } from "react";
import { WordContext } from "../../pages/CardPage";
import { IVerbCard} from "../../interfaces/cardsInterface";

export default function VerbComponent({ verbCard }: { verbCard: IVerbCard }) {
    const answers = verbCard.examples.filter((group) => group[1] === "1").map((group) => group[0])
    const [inputs, setInputs] = useState<string[]>([...Array(answers.length)].map(() => ""))
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])
    const { currStatus, setCurrStatus } = useContext(WordContext)


    const handleInput = (index: number, value: string) => {
        const newinputs = [...inputs]
        newinputs[index] = value
        setInputs(newinputs)
    }

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            console.log("_____Enter pressed", index)
            if (index === answers.length - 1) {
                console.log("check correctness in VerbComponent")
                checkCorrectness()
                return
            }
            inputRefs.current[index + 1]?.focus()
        }
    }

    const checkCorrectness = () => {
        for (let i = 0; i < answers.length; i++) {
            if (inputs[i].toLowerCase() !== answers[i].toLowerCase()) {
                console.log("incorrect")
                setCurrStatus("fail")
                return
            }
        }
        console.log("correct")
        setCurrStatus("success")
    }

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    let inputIndex = 0;
    return (
        <div>
            <div className="m-2 p-2 border-2 border-yellow-300 bg-yellow-200 rounded-md">
                <div className="text-lg">definition: <span className="text-2xl">{verbCard.definition}</span></div>
            </div>
            <div>
                {
                    verbCard.examples.map((group, index) => {
                        if (group[1] === "0") {
                            return <span className="mr-1">{group[0]}</span>
                        } else {
                            const currentInputIndex = inputIndex
                            inputIndex++
                            return <input onChange={(e) => {
                                 handleInput(currentInputIndex, e.target.value)
                                 setCurrStatus("going")
                                 }}
                                ref={(el) => inputRefs.current[currentInputIndex] = el}
                                onKeyDown={(e) => { handleKeyDown(currentInputIndex, e) }}
                                id={String(currentInputIndex)}
                                className="ml-2 m-1 bg-gray-50 border-b-2 border-black focus:bg-gray-100">
                            </input>
                        }
                    })
                }
            </div>

        </div>
    )


}
