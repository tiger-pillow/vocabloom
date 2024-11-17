import mongoose, {mongo, ObjectId, Types} from "mongoose";
import { createChildCard } from "./childDBhelper.js";
import ChildCard from "../schemas/childCardSchema.js"
import { getMotherCardByType, getMotherCardById} from "./adminDBhelper.js";
import { getChildCardsByUser, updateOneChildCard } from "./childDBhelper.js"
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


// the most complex logic
export async function getSessionCard(req:any, res:any) {
    try{
        console.log("______ getSessionCard req.user ______ \n", req.user)

        // find or create session log
        let sessionLog;
        if (req.body.session_id) {
            sessionLog = await SessionLog.findById(req.body.session_id)
        } else {
            sessionLog = await findCreateSessionLog(req.user._id, req.body.timezone_offset)
        }   

        if (!sessionLog) {
            throw new Error("Session log not found")
        }

        // user answer- update child card + add to session log
        if (req.body.feedback) {
            await updateOneChildCard(req.body.childCard_id, req.body.feedback)
        }
     
        let nextCard;
        // create a new child card 
        console.log("______ new_card_count ", sessionLog.new_card_count,  " new_card_limit ", req.user.new_card_limit)
        if (sessionLog.new_card_count < req.user.new_card_limit) {

            const motherdeck = await Deck.findOne()
                .where('_id')
                .equals((await ChildDeck.findById(req.user.current_child_deck))?.motherdeck_id)
                .select('mothercards')
                .lean()
            const mothercards = motherdeck?.mothercards || []
            console.log("______ mother deck mother_cards", mothercards)

            let random_mothercard_id
            
            // Start a session
            const session = await mongoose.startSession();
            try {
                session.startTransaction();
                const childdeck = await ChildDeck.findById(req.user.current_child_deck, null, {session})

                // Get array of unstudied cards by filtering out studied ones
                const unstudiedCards = mothercards.filter(card => 
                    !childdeck?.studied_mothercards.includes(card)  
                );
                // Select random card from unstudied cards
                random_mothercard_id = unstudiedCards[Math.floor(Math.random() * unstudiedCards.length)];

                // Add to studied cards
                await ChildDeck.findByIdAndUpdate(
                    req.user.current_child_deck,
                    { $push: { studied_mothercards: random_mothercard_id } },
                    { session }
                );

                // update session log
                await SessionLog.findByIdAndUpdate(
                    sessionLog._id,
                    { $inc: { new_card_count: 1, total_card_count: 1 } },
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
            
            let newcard = await createChildCard(req.user._id, random_mothercard_id);
            console.log("______ new card \n", newcard)
            
            if (!newcard) {
                throw new Error("No unstudied cards found in deck");
            }
            // let newChildCard = await createChildCard(req.user._id, random_mothercard_id);

        }  else {
            // get next due card 
            nextCard = await getNextDueCard(req.user._id)
        }

        res.status(200).json(
            {nextCard: nextCard, 
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
