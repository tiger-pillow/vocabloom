import mongoose from "mongoose";

const EmailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    }, 
    time_added: {
        type: Date, 
        default: Date.now 
    }
})

export default mongoose.model("EmailSchema", EmailSchema)