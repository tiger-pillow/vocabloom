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
    console.log("signup req: ", req.body)
    let newUser = new User(req.body)
    await newUser.save()
    console.log("new user saved: ", newUser)
}
