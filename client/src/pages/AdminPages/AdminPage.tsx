import React, { useEffect, useState } from 'react';
import {ICard} from "../../interfaces/cardsInterface";
import axiosConfig from "../../axiosConfig";

export default function AdminPage() {

return (
    <div>
        <h1 className='text-center m-2 text-4xl'>Card Management</h1>
        <CardsTable />
    </div>
)
    
}

function CardsTable(){
    const [cards, setCards] = useState<ICard[]>()
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosConfig.get("/vocablist");
                setCards(response.data)
                console.log("card page loading response.data", response.data)
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, [])
    return (
        <div>
            <div className='m-4 p-1 border-2 bg-grey-light grid grid-cols-8 bg-gray-700 text-white'>
                <div className='col-span-1'>Word</div>
                <div className='col-span-1'>{ }</div>
                <div className='col-span-1'>Definition</div>
                <div className='col-span-4'>Example</div>
            </div>


            {
                cards?.map((card)=>{
                    return(
                        <CardsTableRow card={card}/>
                    )
            })
        }

        <AddCard/>
        </div>
    )
}

function CardsTableRow ({card}: {card:ICard}) {
    return (
        <div className='m-4 p-1 border-2 bg-grey-light grid grid-cols-8'>
            <div className='col-span-1'>{card.word}</div>
            <div className='col-span-1'>{}</div>
            <div className='col-span-1'>{card.definition}</div>
            <div className='col-span-4'>{}</div>
        </div>
    )
}

function AddCard(){
    const [word, setWord] = useState()
    const [def, setDef ] = useState()
    const [example, setExample] = useState() 
    return (
        <div className='m-2 p-4 border-4 grid grid-cols-2'>
            <div className='col-span-1 border-4 '>
                <p>Enter the word</p>
                <input className="ml-2 m-1 bg-gray-50 border-2 h-10 border-black focus:bg-gray-100"></input>

                <p>Choose the type of card </p>
                <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        value="Verb cARD"
                        className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="text-gray-700">Verb Card</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        value="Verb cARD"
                        className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="text-gray-700">Noun Card</span>
                </label>
                <p>Definition</p>
                <input className="ml-2 m-1 bg-gray-50 border-2 h-10 border-black focus:bg-gray-100"></input>

                <p>Example sentence</p>
                <p>the module to select the blanks here</p>
                <button>Save</button>
            </div>
            <div className='col-span-1 border-4'
            ></div>
            

        </div>
    )

}