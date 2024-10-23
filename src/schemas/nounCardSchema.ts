import mongoose from "mongoose";

// Define the Flashcard schema
const NounCardSchema = new mongoose.Schema({
    type: { type: String, required: true},
    time_added: {type: Date, default: Date.now},
    status: { type: String, }, 
    word: {type: String,required: true, trim: true, },
    wordID: { type: mongoose.Schema.Types.ObjectId, required: false, },
    definition: { type: String, required: true, trim: true, }, 
    examples: {
        type: [
                [{ type: String, required: true, trim:true }, { type: Number, required: true, enum: [0, 1], },], // one word
            ],
        required: true,
    },
    examplesTranslation: {
        type: String
    }
});



export default mongoose.model("NounCard", NounCardSchema);

