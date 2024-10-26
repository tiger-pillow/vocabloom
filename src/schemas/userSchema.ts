import mongoose from "mongoose";
import ObjectId from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String}, 
    email: {type: String}, 
    password: {type: String}, 
    register_time: {type: Date, default: Date.now},
    // payment_details: {type: String}, 
    // last_login_time: {type: Date, default: Date.now}
    daily_limit: {type: Number}, 
    new_word_limit: {type: Number}
    
})

export default mongoose.model("User", UserSchema);