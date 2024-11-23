import mongoose, { SortOrder, Types } from "mongoose";
import ChildCard from '../schemas/childCardSchema.js'
import { createEmptyCard, Rating, Card, RatingType} from "ts-fsrs";
import { getMotherCardById } from "./adminDBhelper.js";
import {f} from "../index.js";

const FeedbackDict = [Rating.Hard, Rating.Good]



// Create a child card for a user, with a mothercard id, find type by self 
export async function createChildCard(user_id: Types.ObjectId|string, mothercard_id: Types.ObjectId | any) {
    let mothercard = await getMotherCardById(mothercard_id)
    console.log("______createChildCard() mothercard \n", mothercard)
    if (!mothercard) {
        throw new Error("Mothercard not found")
    }
    let mothercard_type = mothercard.type
    // create child card for a user, mothercard 
    const newChildCard = new ChildCard({
        mothercard_id: mothercard_id,
        mothercard_type: mothercard_type, 
        word: mothercard.word,
        user_id: user_id,
        status: "active",
        unseen: true,
        card: createEmptyCard(),
    })
    await newChildCard.save()
    return {newChildCard, mothercard}
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
            console.log("updateOneChildCard() childCard \n", childCard)
            
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
