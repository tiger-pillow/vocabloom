import mongoose, {Types} from "mongoose";
import { Card, Rating } from "ts-fsrs";
import { createChildCard } from "./childDBhelper.js";
import { getMotherCardByType, getOneMotherCard} from "./adminDBhelper.js";
import { getChildCardsByUser, updateOneChildCard } from "./childDBhelper.js"
import {f} from "../index.js"

export async function getSessionCard(req:any, res:any) {
    let user_id = new Types.ObjectId("671ab502ae1e4f9fc8bf19c9")
    console.log("req body content", req.body.feedback)
    if (req.body.feedback === undefined) { // first card 
        let cards = await getChildCardsByUser(user_id)
        if (cards.length === 0){
            console.log("******** creating new child cards")
            const deckOfCards = await getMotherCardByType("noun", "active")
            deckOfCards?.map((card) => {
                createChildCard(user_id, card._id, card.type)
            })
            cards = await getChildCardsByUser(user_id)
        }

        let currentChildCard = cards[0] // FIXME: logic needs to be changed 
        let motherCard = await getOneMotherCard(currentChildCard.mothercard_id as Types.ObjectId, currentChildCard.mothercard_type)
        let result = {
            motherCard: motherCard,
            childCard_id: currentChildCard._id
        }
        res.send(JSON.stringify(result))
    }
    else {
        console.log("req card", req.body.feedback)
        updateOneChildCard(req.body.childCard_id, req.body.feedback )
    }
   


    // **************** If the user has never logged in before ******************

    // get mother cards 
    

}; 


