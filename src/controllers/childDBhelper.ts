import mongoose, { SortOrder, Types } from "mongoose";
import ChildCard from '../schemas/childCardSchema.js'
import { createEmptyCard, Rating, Card, RatingType} from "ts-fsrs";
import { getMotherCardById } from "./adminDBhelper.js";
import {f} from "../index.js";
import { SessionLog } from "../schemas/deckSchema.js";
const FeedbackDict = [Rating.Hard, Rating.Good]



// Create a child card for a user, with a mothercard id, find type by self 
export async function createChildCard(user_id: Types.ObjectId|string, mothercard_id: Types.ObjectId | any) {
    let mothercard = await getMotherCardById(mothercard_id)
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
        status: "unseen",
        card: createEmptyCard(),
    })
    await newChildCard.save()
    console.log("______createChildCard() mothercard \n", mothercard.word, "childcard_id", newChildCard._id)

    return {newChildCard, mothercard}
}

export async function getChildCardsByUser(user_id: Types.ObjectId|string, status: string = "active"){
    let data = ChildCard.find({
        user_id: user_id, 
        status: status
    }).exec()

    return data 
}

export async function learnFeedback(childCard_id: Types.ObjectId, feedback: string, sessionLog_id: Types.ObjectId) {
    try{
        console.log("______ learnFeedback() feedback \n", feedback, "childCard_id", childCard_id, "sessionLog_id", sessionLog_id)

        // find child card
        let childCard = await ChildCard.findById(childCard_id).exec()
        if (!childCard) {
            throw new Error("Child card not found")
        }

        // if archive
        if (feedback === "Archive") {
            childCard.status = "archived"
            await childCard.save()
            return
        }
       
        // update fsrs card
        const scheduling_cards = f.repeat(childCard.card as Card, new Date())
        let fsrs_card, fsrs_log
        switch (feedback){
            case "Again": 
                fsrs_card = scheduling_cards[Rating.Again].card
                fsrs_log = scheduling_cards[Rating.Again].log
                break 
            case "Hard": 
                fsrs_card = scheduling_cards[Rating.Hard].card
                fsrs_log = scheduling_cards[Rating.Again].log
                break
            case "Good":
                fsrs_card = scheduling_cards[Rating.Good].card
                fsrs_log = scheduling_cards[Rating.Again].log
                break
            case "Easy":
                fsrs_card = scheduling_cards[Rating.Easy].card
                fsrs_log = scheduling_cards[Rating.Again].log
                break
        }

        childCard.card = fsrs_card

        // if the card is unseen, counts toward today's new card count
        if (childCard.status === "unseen") {
            childCard.status = "active"
            await SessionLog.findByIdAndUpdate(sessionLog_id, {
                $push: {
                    logs: 
                    {
                        childCard_id: childCard_id,
                        fsrs_log: fsrs_log
                    }
                },
                $inc: {
                    new_card_count: 1,
                    total_card_count: 1,
                }
            })
        } else {
            await SessionLog.findByIdAndUpdate(sessionLog_id, {
                $push: {
                    logs: {   
                        childCard_id: childCard_id,
                        fsrs_log: fsrs_log
                    }
                }, 
                $inc: {
                    total_card_count: 1,
                }
            })
        }

        await childCard.save()

        
    } catch (error) {
        console.log("learnFeedback error is ", error)
    }
}
