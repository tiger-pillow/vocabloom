import mongoose, { Schema } from "mongoose";


// Define the Flashcard schema
const conjugateCardSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        // enum: ['verb', 'noun', 'adjective', 'adverb', 'preposition', 'conjunction', 'interjection'], // Restrict to valid word types
    },
    status: {
        type: String,
    },
    word: {
        type: String,
        required: true, // The word is required
        trim: true, // Remove whitespace from the start and end
    },
    wordID: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
    definition: {
        type: String,
        required: true, // The definition is required
    },
    tense: {
        type: String,
        required: true,
    },
    conjugations: {
        type: [String], // should be normally 6 strings for 6 pronouns
        required: true,
    },
});


export default mongoose.model("ConjugateCard", conjugateCardSchema);