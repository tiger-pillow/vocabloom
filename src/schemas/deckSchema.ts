import mongoose, { mongo, SortOrder, Types } from "mongoose";
import bcrypt from "bcrypt";

const DeckSchema = new mongoose.Schema({
    deck_name: {type: String}, 
    deck_description: {type: String}, 
    deck_size: {type: Number}, // number of cards 
    usercount: {type: Number},
    mothercards: {type: [Types.ObjectId]},
    time_created: {type: Date, default: Date.now}
})


// daily log of a user's session
const SessionLogSchema = new mongoose.Schema({
    user_id: {type: Types.ObjectId}, 
    time_created: {type: Date, default: Date.now}, // utc
    time_offset: {type: Number}, // timezone offset
    time_local: {type: Date}, // local time

    new_card_count: {type: Number},
    total_card_count: {type: Number},
    card_logs: {type: [String]}, 
})

export const ChildDeckSchema = ({
    deck_id: {type: Types.ObjectId},
    deck_name: {type: String},
    time_started: {type: Date},
    progress_index: {type: Number},
    current: {type: Boolean}
})

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true , trim: true},
    email: { type: String, required: true, trim: true, unique: true, lowercase: true},
    password: { type: String, required: true, trim: true, select: false},
    time_created: { type: Date, default: Date.now }, // register time
    // payment_details: {type: String}, 
    // last_login_time: {type: Date, default: Date.now}
    daily_limit: { type: Number },
    new_cards_limit: { type: Number },
    role: { type: String, default: "user", enum: ["user", "admin", "superadmin"] },
    current_deck: {type: ChildDeckSchema},
    decks: {type: [ChildDeckSchema]} // all decks the user has studied
})

// Hash password before saving, never save plain password
UserSchema.pre("save", async function(next) {
    if (! this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

//Compare password method
UserSchema.methods.comparePassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password); 
}

interface UserDocument extends mongoose.Document {
    comparePassword: (enteredPassword: string) => Promise<boolean>;
    username: string;
    email: string;
    password: string;
    time_created: Date;
    daily_limit: number;
    new_word_limit: number;
    role: string;
    decks_studying: [{
        deck_id: Types.ObjectId;
        deck_name: string;
    }]
}



export const User = mongoose.model<UserDocument>("User", UserSchema);
export const Deck = mongoose.model("Deck", DeckSchema)
export const SessionLog = mongoose.model("SessionLog", SessionLogSchema)
