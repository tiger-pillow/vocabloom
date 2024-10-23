import mongoose from "mongoose";
import ObjectId from "mongoose";

const ShadowCardSchema = new mongoose.Schema({
    mothercard_id: { type: ObjectId},
    mothercard_type: {type: String}, 
    user_id: {type: ObjectId}, 
    time_created: {type: Date, default: Date.now}, 
    status: {type: String}, // in case the user chooses to remove this card etc
    
    // part of ts-fsrs schema 
    due: {type: Date}, 
    stability: {type: Number}, 
    elapsed_days: {type: Number}, 
    scheduled_days: {type: Number}, 
    reps: {type: Number}, 
    state: {type: Number}, 
    last_review: {type: Date}
})

export default mongoose.model("ShadowCard", ShadowCardSchema);