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