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
    },
    decks: {
        type: [
            [ {type: String}, {type: mongoose.Schema.Types.ObjectId} ]]
        } ,
});

const VerbCardSchema = new mongoose.Schema({
    type: { type: String, required: true, },
    time_added: { type: Date, default: Date.now },
    status: { type: String,},
    word: {type: String, required: true,  trim: true, 
    wordID: { type: mongoose.Schema.Types.ObjectId, required: false, },
    definition: { type: String, required: true, },
    examples: { 
        type:
            [ // one sentence
                [{ type: String, required: true, }, { type: Number, required: true, enum: [0, 1], },], // one word
            ],
        required: true,
    },
    examplesTranslation: { type: String },
    decks: { type: [[{ type: String }, { type: mongoose.Schema.Types.ObjectId }]] },
}
});


const ConjugateCardSchema = new mongoose.Schema({
    type: { type: String, required: true, },
    time_added: { type: Date, default: Date.now },
    status: { type: String, },
    word: { type: String, required: true, trim: true, },
    wordID: { type: mongoose.Schema.Types.ObjectId, required: false,},
    definition: { type: String, required: true, 
    },
    tense: { type: String, required: true, },
    conjugations: { type: [String], required: true,},
    decks: { type: [[{ type: String }, { type: mongoose.Schema.Types.ObjectId }]] },
});


export const NounCard = mongoose.model("NounCard", NounCardSchema);
export const VerbCard = mongoose.model("VerbCard", VerbCardSchema)
export const ConjugateCard = mongoose.model("ConjugateCard", ConjugateCardSchema);

