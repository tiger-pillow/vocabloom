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
    const [type, setType] = useState("verb")
    const [cards, setCards] = useState<ICard[]>() 
    const [decks, setDecks] = useState<[string, string][]>()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosConfig.post("/getCardsByTypeStatus", {
                    "requestType": type
                });
                let decksResponse = await axiosConfig.get("/getDecks")
                setDecks(decksResponse.data)
                setCards(response.data)
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, [type])


    const update_card = async (card: ICard, action: string, deck_id?: string) => { 
        console.log(action, deck_id)

        const result = await axiosConfig.post("/updateCardStatus", {
            "card": card,
            "action": action,
            "requestType": type, 
            "deck_id": deck_id, 
        })
        setCards([...result.data])
        return
    }

    return (
        <div>
            <button className='bg-yellow-200 hover:bg-yellow-400' onClick={() => {setType("verb")}}>Verb </button> 
            <button className='bg-green-200 hover:bg-green-400' onClick={()=>setType("noun")}>Noun</button>
            <div className='ml-4 mr-4 p-1 border-2  grid grid-cols-9 border-gray-700 bg-gray-700 text-white'>
                <div className='col-span-1'>Word</div>
                <div className='col-span-1'>Def</div>
                <div className='col-span-3'>Example</div>
                <div className='col-span-3'>Deck</div>
                <div className='col-span-1'>Actions</div>
            </div>
            {
                cards?.map((card, i )=>{
                    return(
                        <CardsTableRow card={card as IVerbCard} decks={decks} key = {i}
                            update_card={update_card}
                        />
                    )
            })
        }
      
        </div>
    )
}


function CardsTableRow({ card, decks, update_card }: { card: INounCard | IVerbCard, decks: [string, string][] | undefined, update_card: (card: any, action: string, deck_id?: string) => Promise<void> }) {
    
    let statusClassName = card.status === "active" ? 'm-2 p-2 bg-green-200 rounded-md hover:bg-gray-200' : 'm-2 p-2 bg-gray-200 rounded-md text-xs hover:bg-green-200'
    return (
        <div className='ml-4 mr-4 bg-grey-light grid grid-cols-9'>
            <div className='col-span-1 border'>{card.word}</div>
            <div className='col-span-1 border'>{card.definition}</div>
            <div className='col-span-3 break-words border'>
                <div className='text-blue-800'>{card.examples.map((w) => { return (<span className='pr-1 inline-block'>{w[0]}</span>) })}</div>
                
                <div className=''>{card.examplesTranslation}</div>
                
                </div>
            <div className='col-span-3 border'>
                {card.decks?.map((d) => { return (<span className='border bg-yellow-50 border-yellow-200 rounded-md p-1 m-2 inline-block'>{d[0]} 
                    <button onClick={() => {update_card(card, "removeDeck", d[1])}}> ❌ </button></span>) })}
                <select className="mt-2 p-1 border rounded" onChange={(e) => {update_card(card, "addDeck", e.target.value )}}>
                    <option value="">Select</option>
                    {decks?.map((d, index) => (
                        <option key={d[0]} value={d[1]}>
                            {d[0]}
                        </option>
                    ))}
                </select>
            </div>

            <div className='col-span-1 border'>
                <button className={statusClassName}
                    onClick={() => { update_card(card, "changeStatus")}}
                > {card.status} </button>
                
                <button className='m-2 p-2 bg-red-200 rounded-md hover:bg-red-500'
                    onClick={() => { update_card(card, "delete") }}>delete</button>

            </div>
        </div>
    )
}