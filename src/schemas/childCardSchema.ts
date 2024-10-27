import mongoose from "mongoose";

const ChildCard = new mongoose.Schema({
    mothercard_id: { type: mongoose.Types.ObjectId, required: true},
    mothercard_type: { type: String, required: true}, 
    user_id: { type: mongoose.Types.ObjectId, required: true}, 
    time_created: {type: Date, default: Date.now}, 
    status: {type: String}, // in case the user chooses to remove this card etc
    
    // part of ts-fsrs schema 
    card: {
        due: { type: Date },
        stability: { type: Number },
        difficulty: {type: Number}, 
        elapsed_days: { type: Number },
        scheduled_days: { type: Number },
        reps: { type: Number },
        lapses: {type: Number}, 
        state: { type: Number },
        last_review: { type: Date }
    }
    
})
export default mongoose.model("ChildCard", ChildCard);