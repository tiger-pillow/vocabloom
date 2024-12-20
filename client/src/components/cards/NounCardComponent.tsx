import { KeyboardEvent, useState, useContext, useEffect, useRef } from "react";
import { WordContext } from "../../pages/CardPage";
import { INounCard } from "../../interfaces/cardsInterface";

export default function NounComponent({ nounCard }: { nounCard: INounCard }) {
    const [userInput, setUserInput] = useState<string>()
    const answer = nounCard.examples.filter((group) => group[1] === "1")[0][0]
    const {currStatus, setCurrStatus } = useContext(WordContext)
    // const inputRefs = useRef<(HTMLInputElement | null)[]>([])
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])
    let stability = 3; 

    const checkCorrectness = () => {
        if (userInput?.toLowerCase() === answer.toLowerCase()) {
            setCurrStatus("success")
            console.log("check correctness correct")
            setUserInput("")
        } else {
            setCurrStatus("fail")
        }
        return
    }

    useEffect(() => {
        
        // Cursur on the first input 
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
        
    }, []); // Empty d

    let inputIndex = 0;
    return (
        <div >
            {userInput }
            <div className="m-2 mb-8 p-2 border-gray-300 bg-gray-200 rounded-md">
                <div className="text-lg">definition (noun) <span className="text-2xl">{nounCard.definition}</span></div>
            </div>
          
                <div className="m-2 flex flex-wrap border-2 border-stone-200 bg-stone-100 p-2 rounded-md">
                    {
                        nounCard.examples.map((group, index) => {
                            if (group[1] === "0") {
                                return <span className="mr-1">{group[0]}</span>
                            } else {
                                const currentInputIndex = inputIndex
                                inputIndex++
                                return <input onChange={(e) => {
                                    setUserInput(e.target.value)
                                    setCurrStatus("going")}}
                                    ref={(el) => inputRefs.current[currentInputIndex] = el}
                                    onKeyDown={(e) => { if (e.key === "Enter") { checkCorrectness() } }}
                                    id={String(currentInputIndex)}
                                    className="mr-1 m-1 bg-gray-50 border-b-2 border-black focus:bg-gray-100">
                                </input>
                            }
                        })
                    }
                </div>

        </div>
    )
}

