import mongoose, { mongo, SortOrder, Types } from "mongoose";

const DeckSchema = new mongoose.Schema({
    deck_name: {type: String}, 
    deck_description: {type: String}, 
    decksize: {type: Number}, // number of cards 
    usercount: {type: Number},
    mothercards: {type: [Types.ObjectId]}
})

export const Deck = mongoose.model("Deck", DeckSchema)