import React, { useEffect, useState } from 'react';
import {ICard, INounCard, IVerbCard} from "../../interfaces/cardsInterface";
import axiosConfig from "../../axiosConfig";
import NavBar from '../../components/NavBar';

export default function AdminPage() {

return (
    <div>
        <NavBar></NavBar>
        <CardsTable />
    </div>
)
    
}

function CardsTable(){
    const [cards, setCards] = useState<ICard[]>() 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosConfig.post("/adminCards", {
                    "type": "noun"
                });
                setCards(response.data)
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, [])

    const delete_card = async (card: ICard) => {
        const result = await axiosConfig.post("/deleteCard", {
            "_id": card._id,
            "type": card.type,
        })
        if (result.status === 200){
            setCards(result.data)
        }
        return 
    }

    const change_status = async (card: ICard) => {
        const result = await axiosConfig.post("/changeStatus", {
            "_id": card._id,
            "type": card.type,
        })
        if (result.status === 200) {
            setCards(result.data)
        }
        return
    }



    return (
        <div>
            <div className='ml-4 mr-4 p-1 border-2  grid grid-cols-9 border-gray-700 bg-gray-700 text-white'>
                <div className='col-span-1'>Word</div>
                <div className='col-span-1'>Def</div>
                <div className='col-span-3'>Example</div>
                <div className='col-span-3'>Translation</div>
                <div className='col-span-1'>Actions</div>
            </div>
            {
                cards?.map((card)=>{
                    return(
                        <CardsTableRow card={card as IVerbCard} 
                        onDelete= {()=>delete_card(card as ICard)}
                        onChangeStatus={() => change_status(card as ICard)}
                        />
                    )
            })
        }
      
        </div>
    )
}

function CardsTableRow({ card, onDelete, onChangeStatus }: { card: INounCard | IVerbCard, onDelete: () => Promise<void>, onChangeStatus: () => Promise<void> }) {
    
    let statusClassName = card.status === "active" ? 'm-2 p-2 bg-green-200 rounded-md hover:bg-gray-200' : 'm-2 p-2 bg-gray-200 rounded-md text-xs hover:bg-green-200'
    return (
        <div className='ml-4 mr-4 bg-grey-light grid grid-cols-9'>
            <div className='col-span-1 border'>{card.word}</div>
            <div className='col-span-1 border'>{card.definition}</div>
            <div className='col-span-3 break-words border'>{card.examples.map((w) => {return (<span className='pr-1 inline-block'>{w[0]}</span>)})}</div>
            <div className='col-span-3 border'>{card.examplesTranslation}</div>
            <div className='col-span-1 border'>
                <button className={statusClassName}
                onClick={onChangeStatus}
                > {card.status} </button>
                
                <button className='m-2 p-2 bg-red-200 rounded-md hover:bg-red-500'
                    onClick={onDelete}>delete</button>

            </div>
        </div>
    )
}