import mongoose, {mongo, ObjectId, Types} from "mongoose";
import { createChildCard } from "./childDBhelper.js";
import ChildCard from "../schemas/childCardSchema.js"
import { getMotherCardByType, getMotherCardById} from "./adminDBhelper.js";
import { getChildCardsByUser, learnFeedback } from "./childDBhelper.js"
import { SessionLog, Deck, ChildDeck } from "../schemas/deckSchema.js"
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



export async function getSessionCard(req:any, res:any) {
    try{
        console.log("______ getSessionCard() req.user ______ \n", req.user)

        
        let sessionLog;
        // if session is ongoing, with id and feedback, then update 
        if (req.body.session_id) {
            sessionLog = await SessionLog.findById(req.body.sessionLog_id)
            await learnFeedback(req.body.childCard_id, req.body.feedback, req.body.sessionLog_id)
        } else {
            // find an interrupted session, or create a new one
            sessionLog = await findCreateSessionLog(req.user._id, req.body.timezone_offset)
        }   

        if (!sessionLog) {
            throw new Error("Session log not found")
        }

        //FIXME: need to fix this, return something meaningful 
        if (sessionLog.total_card_count >= req.user.total_card_limit) {
            throw new Error("Study limit reached")
        }


        let nextChildCard, nextMotherCard;


        // get new card
        // 1. give unseen childcards
        // 2. if less than limit, give new card 
        // 2.5 if no more new card, give a due card 
        if (sessionLog.new_card_count < req.user.new_card_limit) {


            const motherdeck = await Deck.findById(req.user.current_deck.motherdeck_id)
            const mothercards = motherdeck?.mothercards || []
            console.log("______ mother deck mother_cards", mothercards)

            let new_mothercard_id
            
            // Atomic Session
            const session = await mongoose.startSession();
            try {
                session.startTransaction();
                const childdeck = await ChildDeck.findById(req.user.current_child_deck, null, {session})

                // Get an unstudied card from the motherdeck
                const unstudiedCards = mothercards.filter(card => 
                    !childdeck?.studied_mothercards.includes(card)  
                );

                if (unstudiedCards.length === 0) {
                    throw new Error("No unstudied cards found in deck");
                }
                new_mothercard_id = unstudiedCards[0];
                console.log("______ new_mothercard_id \n", new_mothercard_id)
                console.log("unstudiedCards", unstudiedCards)

                // Add to studied cards
                await ChildDeck.findByIdAndUpdate(
                    req.user.current_child_deck,
                    { $push: { studied_mothercards: new_mothercard_id } },
                    { session }
                );

                // Commit the transaction
                await session.commitTransaction();
            } catch (error) {
                // If error occurs, rollback changes
                await session.abortTransaction();
                throw error;
            } finally {
                // End session
                session.endSession();
            }
            
            ({ newChildCard: nextChildCard, mothercard: nextMotherCard } = await createChildCard(req.user._id, new_mothercard_id));
            console.log("_____ new child card \n", nextChildCard, nextMotherCard)
            
            if (!nextChildCard) {
                throw new Error("child card not created");
            }
            
        }  else {
            // get next due card 
            nextChildCard = await getNextDueCard(req.user._id)
            
            if (!nextChildCard) {
                throw new Error("No due cards found");
            }
            nextMotherCard = await getMotherCardById(nextChildCard.mothercard_id as Types.ObjectId)
        } 


        
        res.status(200).json({
            childCard: nextChildCard, 
            motherCard: nextMotherCard,
            sessionLog: sessionLog})
    
    } catch (error) {
            console.log("!!!!!!!!!!!!!!______error \n", error)
            res.status(500).json({error: error})
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
