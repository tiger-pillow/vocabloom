import mongoose from "mongoose";
// Define the Flashcard schema
const VerbCardSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        // enum: ['verb', 'noun', 'adjective', 'adverb', 'preposition', 'conjunction', 'interjection'], // Restrict to valid word types
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
    examples: {
        type: [
            [{ type: String, required: true, }, { type: Number, required: true, enum: [0, 1], },], // one word
        ],
        required: true,
    },
});
export default mongoose.model("VerbCard", VerbCardSchema);
//# sourceMappingURL=verbcardSchema.js.map