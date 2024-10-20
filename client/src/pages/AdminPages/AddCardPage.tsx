import { createContext } from "react";
import { useState, useEffect } from "react";
import { ICard } from "../../interfaces/cardsInterface";
import axiosConfig from "../../axiosConfig";
import NavBar from "../../components/NavBar";

export default function AddCardPage() {
    const [word, setWord] = useState(String)
    const [def, setDef] = useState(String)
    const [type, setType] = useState(String)
    const [sentence, setSentence] = useState(String)
    const [examples, setExamples] = useState(Array<[string, string]>)
    const [examplesTrans, setExamplesTrans] = useState(String)
    const [status, setStatus] = useState(0)

    const add_card = () => {
        axiosConfig.post("/addCard", {
            word: word.trim(), 
            definition: def.trim(), 
            type: type.trim(), 
            examples: examples,
            examplesTranslation: examplesTrans,
        })
        .then((res) => {
            setStatus(res.status)
            }
        )
    }
    
    const modify_blank = (i: number) => {
        let temp = [...examples]
        if (temp[i][1] === "1"){
            temp[i][1] = "0"
        } else {
            temp[i][1] = "1"
        }
        setExamples(temp)
    }

    useEffect(() => {
        const newExample: Array<[string, string]> = []
        sentence.trim().split(/[ ,]+/).forEach((word, i) => {
            newExample.push([word, "0"])
        })
        setExamples(newExample)
    }, [sentence])

    useEffect(() => {
        if (status === 200){
            setTimeout(() => {
                setStatus(0)
            }, 2000)
        }
    }, [status])


    return (
        <div>
            <NavBar></NavBar>
            <div className="text-lg m-2 w-full text-center ">&nbsp;&nbsp;&nbsp;&nbsp;
                {status === 200 ? <span> ✅ Saved succesfully </span> : status === 501 ? <span > ❌ didn't save </span> : <span>Inputting..</span>}

            </div>

            <div className='m-3 p-6 border-4 grid grid-cols-2 text-lg'>
                {/* Left column */}
                <div className='col-span-1 border-2 m-2 p-6'>
                    <div className="m-2"> Choose the type of card </div>
                    <div className="flex space-x-4">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="cardType"
                                    className="form-radio h-6 w-6 text-blue-600 scale-200"
                                    onChange={()=>{setType("verb")}}
                                />
                                <span className="text-gray-700">Verb Card</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="cardType"
                                    className="form-radio h-6 w-6 text-blue-600 scale-200"
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
                        examples.map((w, i) => {
                            var classNameVar = ((w[1] === "1") ? 'bg-yellow-400 m-2 border-2 rounded h-8 text-lg' : 'h-8 bg-gray-50 m-2 border-2 rounded text-lg');
                            return (
                                <span onClick={()=>{ modify_blank(i)}} className = {classNameVar}>{w[0]} &nbsp; </span>
                            )
                        })
                    }
                    </div>


                    <div>
                        Examples Translation
                        <input className="bg-gray-50 border-2 h-10 w-full focus:bg-gray-100 "
                            onChange={(e) => setSentence(e.target.value)}></input>
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
                    <p>{examples.map((w, i) => {
                        return(
                            <div>{w}</div>
                        )
                    })}</p>
                </div>
            </div>
        </div>
    )

}