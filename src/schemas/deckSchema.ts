import mongoose, { mongo, SortOrder, Types } from "mongoose";

const DeckSchema = new mongoose.Schema({
    deck_name: {type: String}, 
    deck_description: {type: String}, 
    decksize: {type: Number}, // number of cards 
    usercount: {type: Number},
    mothercards: {type: [Types.ObjectId]},
    time_created: {type: Date, default: Date.now}
})


const SessionLogSchema = new mongoose.Schema({
    user_id: {type: Types.ObjectId}, 
    time_created: {type: Date, default: Date.now}, 
    deck_id: {type: Types.ObjectId}, // could be an array, if at the end of one deck and beginning of another deck
    card_logs: {type: [String]}, 
    time_finished: {type: Date},

})

const UserSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String },
    time_created: { type: Date, default: Date.now }, // register time
    // payment_details: {type: String}, 
    // last_login_time: {type: Date, default: Date.now}
    daily_limit: { type: Number },
    new_word_limit: { type: Number },
    decks_studying: {type: [
        {
            deck_id: {type: Types.ObjectId}, 
            deck_name: {type: String}, 
            time_started: {type: Date}, 
            time_last_studied: {type: Date}, 
            progress_index: {type: Number} // the next new card index
            
        }
    ]}
})

export const User = mongoose.model("User", UserSchema);
export const Deck = mongoose.model("Deck", DeckSchema)
export const SessionLog = mongoose.model("SessionLog", SessionLogSchema)