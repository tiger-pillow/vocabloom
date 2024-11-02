import mongoose, { mongo, SortOrder, Types } from "mongoose";

const DeckSchema = new mongoose.Schema({
    deck_name: {type: String}, 
    deck_description: {type: String}, 
    decksize: {type: Number}, // number of cards 
    usercount: {type: Number},
    mothercards: {type: [Types.ObjectId]}
})

export const Deck = mongoose.model("Deck", DeckSchema)

const SessionLogSchema = new mongoose.Schema({
    user_id: {type: Types.ObjectId}, 
    time_created: {type: Date, default: Date.now}, 
    deck_id: {type: Types.ObjectId}, // could be an array, if at the end of one deck and beginning of another deck
    card_logs: {type: [String]}, 
    time_finished: {type: Date},

})

const SessionLog = mongoose.model("SessionLog", SessionLogSchema)