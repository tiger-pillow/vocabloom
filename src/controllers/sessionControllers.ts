import mongoose, {ObjectId, Types} from "mongoose";
import { createChildCard } from "./childDBhelper.js";
import ChildCard from "../schemas/childCardSchema.js"
import { getMotherCardByType, getMotherCardById} from "./adminDBhelper.js";
import { getChildCardsByUser, updateOneChildCard } from "./childDBhelper.js"
import { SessionLog } from "../schemas/deckSchema.js"
import moment from "moment-timezone";



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


// the most complex logic
export async function getSessionCard(req:any, res:any) {

    let session_id; 
    console.log("timezone offset: req body ", req.body.timezone_offset)

    // save feedback, if there is any
    if (req.body.feedback){
        await updateOneChildCard(req.body.childCard_id, req.body.feedback)
    }

    // find/create session log
    if (! req.body.feedback && !req.body.session_id) {
       // try to find today's session log 
        const sessionLog = await findCreateSessionLog(req.user._id, req.body.timezone_offset)
       // if not found, create a new one

    }
    
    // next card

}; 
const findCreateSessionLog = async (user_id: Types.ObjectId, timezone_offset: number) => {
        // Get utc, convert to local time, and then get start of day and end of day
        const startOfDay = moment().utc().add(timezone_offset, 'hours').startOf('day').toDate()
        const endOfDay = moment().utc().add(timezone_offset, 'hours').endOf('day').toDate()
        
        console.log("______start of day", startOfDay, "end of day", endOfDay)
        
        // Use findOneAndUpdate with upsert to atomically find or create
        const sessionLog = await SessionLog.findOneAndUpdate(
            {
                user_id: user_id,
                time_local: {
                    $gte: startOfDay,
                    $lte: endOfDay
                }
            },
            {
                $setOnInsert: {
                    user_id: user_id,
                    time_offset: timezone_offset,
                    time_local: moment().utc().add(timezone_offset, 'hours').toDate(),
                    new_card_count: 0,
                    total_card_count: 0,
                    card_logs: []
                }
            },
            {
                new: true, // Return the modified document
                upsert: true // Create if not exists
            }
        ).exec()

        console.log("______session log", sessionLog)
        return sessionLog
}
