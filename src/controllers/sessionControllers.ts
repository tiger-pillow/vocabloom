import mongoose, {ObjectId, Types} from "mongoose";
import { createChildCard } from "./childDBhelper.js";
import ChildCard from "../schemas/childCardSchema.js"
import { getMotherCardByType, getMotherCardById} from "./adminDBhelper.js";
import { getChildCardsByUser, updateOneChildCard } from "./childDBhelper.js"



export async function getNextDueCard(user_id: Types.ObjectId) {
    try {
        // Find documents with the specific user_id
        const documents = await ChildCard.find({ user_id: user_id })
            // Sort by card.due in ascending order to get the oldest first
            .sort({ "card.due": 1 })
            .limit(1) // Get the oldest date only
            .exec();

        return documents[0]
    } catch (error) {
        console.error("Error retrieving documents:", error);
    }
}
export async function getSessionCard(req:any, res:any) {
    let user_id = new Types.ObjectId("671ab502ae1e4f9fc8bf19c9")
    console.log("req body content", req.body.feedback)

    if (req.body.feedback === undefined) { // first card 
        let currentChildCard = await getNextDueCard(user_id)
        if (currentChildCard === undefined){
            console.log("******** creating new child cards")
            const deckOfCards = await getMotherCardByType("noun", "active")
            deckOfCards?.map((card) => {
                createChildCard(user_id, card._id, card.type)
            })
            currentChildCard = await getNextDueCard(user_id)
        } 
        if (currentChildCard){
            let motherCard = await getMotherCardById(currentChildCard.mothercard_id as Types.ObjectId, currentChildCard.mothercard_type)
            let result = {
                motherCard: motherCard,
                childCard_id: currentChildCard._id
            }
            res.send(JSON.stringify(result))
        }
        
    }
    else {
        console.log("req card", req.body.feedback)
        await updateOneChildCard(req.body.childCard_id, req.body.feedback )
        let nextChild = await getNextDueCard(user_id)
        console.log("next child is ", nextChild)
        if (nextChild !== undefined){
            let nextMother = await getMotherCardById(nextChild.mothercard_id as Types.ObjectId, nextChild.mothercard_type)
            console.log("-----next mother is ", nextMother)
            res.send(JSON.stringify(nextMother))
        }
    }
   

}; 


