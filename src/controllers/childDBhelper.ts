import mongoose, { SortOrder, Types } from "mongoose";
import ChildCard from '../schemas/childCardSchema.js'
import { createEmptyCard, Rating, Card, RatingType} from "ts-fsrs";
import {f} from "../index.js";

const FeedbackDict = [Rating.Hard, Rating.Good]



export async function createChildCard(user_id: Types.ObjectId|string, mothercard_id: Types.ObjectId|string, mothercard_type: string ) {
    // create child card for a user, mothercard 
    const newChildCard = new ChildCard({
        mothercard_id: mothercard_id,
        mothercard_type: mothercard_type, 
        user_id: user_id,
        status: "active",
        card: createEmptyCard(),
    })
    await newChildCard.save()
    return true
}

export async function getChildCardsByUser(user_id: Types.ObjectId|string, status: string = "active"){
    let data = ChildCard.find({
        user_id: user_id, 
        status: status
    }).exec()

    return data 
}

export async function updateOneChildCard(id: Types.ObjectId, feedback: string) {
    try{
        let childCard = await ChildCard.findById(id).exec()
        if (childCard ){
        
            const scheduling_cards = f.repeat(childCard.card as Card, new Date())
            let card 
            switch (feedback){
                case "Again": 
                    card = scheduling_cards[Rating.Again].card
                    break 
                case "Hard": 
                    card = scheduling_cards[Rating.Hard].card
                    break
                case "Good":
                    card = scheduling_cards[Rating.Good].card
                    break
                case "Easy":
                    card = scheduling_cards[Rating.Easy].card
                    break
            }
            childCard.card = card
            await childCard.save()
            console.log("updated child card status, next due date is ", card?.due)
        } else {
            throw new Error("cannot find child card");
        }
    } catch (error) {
        console.log("updateOneChildCard error is ", error)
    }
}
