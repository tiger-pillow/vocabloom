import mongoose from "mongoose";

// Define the Flashcard schema
const NounCardSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        // enum: ['verb', 'noun', 'adjective', 'adverb', 'preposition', 'conjunction', 'interjection'], // Restrict to valid word types
    },
    time_added: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        // active for usable cards, dormant for non-active
    }, 
    word: {
        type: String,
        required: true, // The word is required
        trim: true,  // Remove whitespace from the start and end
    },
    wordID: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
    definition: {
        type: String,
        required: true, trim:true,// The definition is required
    },
    
    examples: {
        type:
            [ // one sentence
                [{ type: String, required: true, trim:true }, { type: Number, required: true, enum: [0, 1], },], // one word
            ],
        required: true,
    },
    examplesTranslation: {
        type: String
    }
});

export default mongoose.model("NounCard", NounCardSchema);

