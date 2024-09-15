import { KeyboardEvent, useState, useContext, useEffect, useRef } from "react";
import { WordContext } from "../../pages/CardPage";
import { INounCard } from "../../interfaces/cardsInterface";

export default function NounComponent({ nounCard }: { nounCard: INounCard }) {
    const [userInput, setUserInput] = useState<string>()
    const answer = nounCard.examples.filter((group) => group[1] === "1")[0][0]
    const { currStatus, setCurrStatus } = useContext(WordContext)
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])


    const checkCorrectness = () => {
        if (userInput?.toLowerCase() === answer.toLowerCase()) {
            setUserInput("")
            setCurrStatus("success")
        } else {
            setCurrStatus("fail")
        }
        return
    }

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    })

    let inputIndex = 0;
    return (
        <div >
            <div className="m-2 p-2 border-2 border-yellow-300 bg-yellow-200 rounded-md">
                <div className="text-lg">definition (noun) <span className="text-2xl">{nounCard.definition}</span></div>
            </div>
            <div className="m-2 flex flex-wrap border-2 border-stone-200 bg-stone-100 p-2 rounded-md">
                {
                    nounCard.examples.map((group, index) => {
                        if (group[1] === "0") {
                            return <span>{group[0]}</span>
                        } else {
                            const currentInputIndex = inputIndex
                            inputIndex++
                            return <input onChange={(e) => {
                                setUserInput(e.target.value)
                                setCurrStatus("going")}}
                                ref={(el) => inputRefs.current[currentInputIndex] = el}
                                onKeyDown={(e) => { if (e.key === "Enter") { checkCorrectness() } }}
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

