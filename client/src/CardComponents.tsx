import React, { KeyboardEvent, useState, useContext, useEffect, useRef} from "react";
import { WordContext } from "./WordPage";
import { IVerbCard, IConjugateCard, INounCard, ICard} from "./Interface";

export function CardComponent({card} : {card: ICard}) {
    switch (card.type) {
        case "verb":
            return <VerbComponent verbCard={card as IVerbCard}/>
        case "conjugate":
            return <ConjugateComponent conjugateCard={card as IConjugateCard}/>
        case "noun":
            return <NounComponent nounCard={card as INounCard}/>
        default:
            return <div>Card type not recognized</div>
    }
}

export function ConjugateComponent({ conjugateCard }: { conjugateCard: IConjugateCard}){
    const [userInput, setUserInput] = useState<string[]>(["", "", "", "", "", ""])
    const {currStatus, setCurrStatus } = useContext(WordContext)
    const input1Ref = useRef<HTMLInputElement>(null)
    const input2Ref = useRef<HTMLInputElement>(null)
    const input3Ref = useRef<HTMLInputElement>(null)
    const input4Ref = useRef<HTMLInputElement>(null)
    const input5Ref = useRef<HTMLInputElement>(null)
    const input6Ref = useRef<HTMLInputElement>(null)

    useEffect(()=> {
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
        if (e.key === "Tab"){ // carry the current input to the next input
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
            if (userInput[i] !== conjugateCard.conjugation[i]) {
                console.log("incorrect")
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
                    Je <input value={userInput[0]} ref={input1Ref} onKeyDown={(e) => handleKeyDown(e, input2Ref, 0)} onChange={(e) => handleChange(e.target.value, 0)} className = {INPUT_CLASSNAME}></input>
                </div>
                <div>
                    Tu <input value = {userInput[1]} ref={input2Ref} onKeyDown={(e) => handleKeyDown(e, input3Ref, 1)} onChange={(e) => handleChange(e.target.value, 1)} className={INPUT_CLASSNAME}></input>
                </div>
                <div>
                    Il/Elle/On <input value={userInput[2]} ref={input3Ref} onKeyDown={(e) => handleKeyDown(e, input4Ref, 2)} onChange={(e) => handleChange(e.target.value, 2)} className={INPUT_CLASSNAME}></input>
                </div>
                <div>
                    Nous <input value={userInput[3]} ref={input4Ref} onKeyDown={(e) => handleKeyDown(e, input5Ref, 3)} onChange={(e) => handleChange(e.target.value, 3)} className={INPUT_CLASSNAME}></input>
                </div>
                <div>
                    Vous <input value = {userInput[4]} ref={input5Ref} onKeyDown={(e) => handleKeyDown(e, input6Ref, 4)} onChange={(e) => handleChange(e.target.value, 4) } className={INPUT_CLASSNAME}></input>
                </div>
                <div>
                    Ils/ Elles <input value={userInput[5]} ref={input6Ref} onKeyDown={(e) => handleKeyDown(e, input6Ref, 5)} onChange={(e) => handleChange(e.target.value, 5)} className={INPUT_CLASSNAME}></input>
                </div>
            </div>
        </div>
    )
}


export function VerbComponent({verbCard}: {verbCard: IVerbCard}){
    const answers = verbCard.sentence.filter((group) => group[1] === 1).map((group) => group[0])
    const [inputs, setInputs] = useState<string[]>([...Array(answers.length)].map(() => ""))
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])
    const { currStatus, setCurrStatus } = useContext(WordContext)


    const handleInput = (index:number, value:string) => {
        const newinputs = [...inputs]
        newinputs[index] = value
        setInputs(newinputs)
    }

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            console.log("_____Enter pressed", index)
            if (index === answers.length -1 ) {
                console.log("check correctness in VerbComponent")
                checkCorrectness()
                return 
            }
            inputRefs.current[index + 1]?.focus()
        }
    }
    
    const checkCorrectness = () => {
        for (let i = 0; i < answers.length; i++) {
            if (inputs[i] !== answers[i]) {
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
                    verbCard.sentence.map((group, index) => {
                        if (group[1] === 0) {
                            return <span>{group[0]}</span>
                        } else {
                            const currentInputIndex = inputIndex
                            inputIndex++
                            return <input onChange={(e) => { handleInput(currentInputIndex, e.target.value)}} 
                                ref={(el) => inputRefs.current[currentInputIndex] = el}
                                onKeyDown={(e) => { handleKeyDown(currentInputIndex, e)}}
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


export function NounComponent({ nounCard }: { nounCard: INounCard }) {
    const [userInput, setUserInput] = useState<string>()
    const { currStatus, setCurrStatus } = useContext(WordContext)

    // TODO: add key handler

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
                                <input type="text" value={userInput} className="bg-gray-300 border-b-8 border-gray-300 focus:border-blue-500" onChange={e => setUserInput(e.target.value)} />
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

