import EmailSchema from "../schemas/emailSchema.js";
import User from '../schemas/userSchema.js'
import bcrypt from 'bcrypt';


export async function addEmail(content: {email: string}){
    const newEmail = new EmailSchema({
        email: content.email
    })
    await newEmail?.save()
    console.log("email saved successfully ", content.email)
}


export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

export async function addUser(content: {
    username: string, 
    email: string, 
    password: string
}) { 
    const newUser = new User({
        username: content.username, 
        email: content.email, 
        password: content.password,
    })

    await newUser?.save()
    console.log("user saved ")
}