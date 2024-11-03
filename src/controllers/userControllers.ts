import EmailSchema from "../schemas/emailSchema.js";
import { User } from "../schemas/deckSchema.js";
// import bcrypt from 'bcrypt';


export async function joinWaitlist(req: any, res: any){
    const newEmail = new EmailSchema({
        email: req.body.email
    })
    await newEmail?.save()
    console.log("email saved successfully ", req.body.email)
}

export async function signUp(req: any, res: any){
    
}
