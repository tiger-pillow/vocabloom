import { createContext } from "react";
import { useState, useEffect } from "react";
import { ICard } from "../../interfaces/cardsInterface";
import axiosConfig from "../../axiosConfig";

export default function AddCardPage() {
    const [word, setWord] = useState(String)
    const [def, setDef] = useState(String)
    const [type, setType] = useState(String)
    const [sentence, setSentence] = useState(String)
    const [example, setExample] = useState(Array<[string, string]>)


    const add_card = () => {
        axiosConfig.post("/addCard", {
            word: word.trim(), 
            definition: def.trim(), 
            type: type.trim(), 
            example: example,
        })
        .then((res) => {
            console.log("saved the card", res)
            }
        )
    }
    
    const modify_blank = (i: number) => {
        let temp = [...example]
        if (temp[i][1] === "1"){
            temp[i][1] = "0"
        } else {
            temp[i][1] = "1"
        }
        setExample(temp)
    }

    useEffect(() => {
        const newExample: Array<[string, string]> = []
        sentence.trim().split(/[ ,]+/).forEach((word, i) => {
            newExample.push([word, "0"])
        })
        setExample(newExample)
    }, [sentence])


    return (
        <div>
            <div className="text-2xl ">Create new cards </div>
            <div className='m-6 p-6 border-4 grid grid-cols-2'>

                {/* Left column */}
                <div className='col-span-1 border-2 m-2 p-6'>
                    <div className="m-2"> Choose the type of card 
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="cardType"
                            className="form-radio h-4 w-4 text-blue-600"
                            onChange={()=>{setType("verb")}}
                        />
                        <span className="text-gray-700">Verb Card</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="cardType"
                            className="form-radio h-4 w-4 text-blue-600"
                            onChange={() => { setType("noun") }}
                        />
                        <span className="text-gray-700">Noun Card</span>
                    </label>
                    </div>

                    <div>Enter the word
                        <input className="bg-gray-50 border-2 h-10 w-full focus:bg-gray-100"
                            onChange={(e) => setWord(e.target.value.trim())}></input>
                    </div>

                    <div>Definition
                        <input className="bg-gray-50 border-2 h-10 w-full focus:bg-gray-100 "
                            onChange={(e) => setDef(e.target.value.trim())}></input>
                    </div>

                    <div>Sentence
                        <input className="bg-gray-50 border-2 h-10 w-full focus:bg-gray-100 "
                            onChange={(e) => setSentence(e.target.value)}></input>
                    </div>
                    <div className="">
                    <p>Select the blanks </p>
                    {
                        example.map((w, i) => {
                            var classNameVar = ((w[1] === "1") ? 'bg-yellow-400 m-2 border-2 rounded' : 'bg-gray-50 m-2 border-2 rounded');
                            return (
                                <span onClick={()=>{ modify_blank(i)}} className = {classNameVar}>{w[0]} &nbsp; </span>
                            )
                        })
                    }
                    </div>

                    <button className="m-4 h-10 w-20 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
                    onClick={add_card}
                    >Save</button>
                </div>
                {/* Right column */}

                <div className='col-span-1 border-2 m-2 p-8'>
                    <p> Word: {word} </p>
                    <p> Type: {type} </p>
                    <p> Definition: {def} </p>
                    <p>{example.map((w, i) => {
                        return(
                            <div>{w}</div>
                        )
                    })}</p>
                </div>
            </div>
        </div>
    )

}