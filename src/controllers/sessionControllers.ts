import mongoose, {mongo, ObjectId, Types} from "mongoose";
import { createChildCard } from "./childDBhelper.js";
import ChildCard from "../schemas/childCardSchema.js"
import { getMotherCardByType, getMotherCardById} from "./adminDBhelper.js";
import { getChildCardsByUser, learnFeedback } from "./childDBhelper.js"
import { SessionLog, Deck, ChildDeck , User} from "../schemas/deckSchema.js"
import moment from "moment-timezone";

export async function getNextDueCard(user_id: Types.ObjectId, offset: number = 1) {
    try {
        // find local date from UTC
        const localDate = moment().utc().add(offset, 'hours').toDate()
        const endOfDay = moment(localDate).endOf('day').toDate()

        // Find documents with the specific user_id
        const documents = await ChildCard.find({ user_id: user_id })
            // Sort by card.due in ascending order to get the oldest first
            .where("card.due").lte(endOfDay.getTime())
            .sort({ "card.due": 1 })
            .limit(1) // Get the oldest date only
            .exec();

        return documents[0]
    } catch (error) {
        console.error("Error retrieving documents:", error);
    }
}

export async function debugRemove() {
    try {
        console.log("############### debugRemove() ###############")
        await ChildCard.deleteMany({})
        await SessionLog.deleteMany({})
        await ChildDeck.deleteMany({})
        await User.deleteMany({})
      
    } catch (error) {
        console.error("Error removing debug data:", error)
    }
}



export async function getSessionCard(req:any, res:any) {
    try{
        console.log("getSessionCard() user request \n", req.body)
        
        let sessionLog;
        // if session is ongoing, with id and feedback, then update 
        if (req.body.sessionLog_id) {
            await learnFeedback(req.body.childCard_id, req.body.feedback, req.body.sessionLog_id)
            sessionLog = await SessionLog.findById(req.body.sessionLog_id)
        } else {
            // find an interrupted session, or create a new one
            sessionLog = await findCreateSessionLog(req.user._id, req.body.timezone_offset)
        }   

        if (!sessionLog) {
            throw new Error("Session log not found")
        }

        // reaching daily study limit
        if (sessionLog.total_card_count >= req.user.daily_limit) {
            console.log("Reached daily study limit, finished session")
            res.status(200).json({
                message: "Finished",
                sessionLog: sessionLog
            })
            return
        }


        let nextChildCard, nextMotherCard;
        if (sessionLog.new_card_count < req.user.new_card_limit) {

            // 1. Give unseen childcards
            const unseenChildCard = await ChildCard.findOne({
                user_id: req.user._id,
                status: "unseen"
            })

            if (unseenChildCard) {
                nextChildCard = unseenChildCard
                nextMotherCard = await getMotherCardById(nextChildCard.mothercard_id as Types.ObjectId)
                res.status(200).json({
                    message: "Success",
                    childCard: nextChildCard,
                    motherCard: nextMotherCard,
                    sessionLog: sessionLog
                })
                return
            }

            // 2. No unseen childcards, give a new card
            // compare childdeck studied cards with motherdeck, choose new one and add to studied
            let new_mothercard_id
            const motherdeck = await Deck.findById(req.user.current_deck.motherdeck_id)
            const mothercards = motherdeck?.mothercards || []
            const session = await mongoose.startSession();
            try {
                session.startTransaction();
                
                // Get motherdeck and childdeck atomically within transaction
                const childdeck = await ChildDeck.findById(req.user.current_deck.childdeck_id, null, {session})


                if (!childdeck) {
                    throw new Error("Child deck not found");
                }

                // Get an unstudied card from the motherdeck
                const unstudiedCards = mothercards.filter(card => 
                    !childdeck.studied_mothercards.includes(card)
                );

                if (unstudiedCards.length === 0) {
                    throw new Error("No unstudied cards found in deck");
                }
                new_mothercard_id = unstudiedCards[0];

                // Update studied cards atomically
                await ChildDeck.findByIdAndUpdate(
                    childdeck._id,
                    { $push: { studied_mothercards: new_mothercard_id } },
                    { session }
                );

                await session.commitTransaction();
            } catch (error) {
                await session.abortTransaction();
                throw error;
            } finally {
                await session.endSession();
            }

            
            ({ newChildCard: nextChildCard, mothercard: nextMotherCard } = await createChildCard(req.user._id, new_mothercard_id));
            
            if (nextChildCard) {
                res.status(200).json({
                    message: "Success",
                    childCard: nextChildCard,
                    motherCard: nextMotherCard,
                    sessionLog: sessionLog
                })
                return
            }
        } 

        if (nextChildCard) {
            throw new Error("nextChildCard is already initiated but not sent, shouldn't happen")
        }

        // get next due card 
        nextChildCard = await getNextDueCard(req.user._id) as any
        if (!nextChildCard) { // no more cards due 
            res.status(200).json({
                message: "Finished",
                sessionLog: sessionLog
            })
            return 
        }

        nextMotherCard = await getMotherCardById(nextChildCard.mothercard_id as Types.ObjectId)
        res.status(200).json({
            message: "Success", 
            childCard: nextChildCard, 
            motherCard: nextMotherCard,
            sessionLog: sessionLog})
    
    } catch (error) {
        console.log("!!!!!!!!!!!!!! ERROR in getSessionCard() !!!!!!!!!!!!!! \n", error)
            res.status(500).json({message: "Failed", 
                error: error})
        }

}; 


/// Find if the user has a session for that local day, if not create one
const findCreateSessionLog = async (user_id: Types.ObjectId, timezone_offset: number) => {
        // Get utc, convert to local time, and then get start of day and end of day
        const startOfDay = moment().utc().add(timezone_offset, 'hours').startOf('day').toDate()
        const endOfDay = moment().utc().add(timezone_offset, 'hours').endOf('day').toDate()
        
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

        return sessionLog
}
