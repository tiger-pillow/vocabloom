import EmailSchema from "../schemas/userSchemas.js";


export async function addEmail(content: {email: string}){
    const newEmail = new EmailSchema({
        email: content.email
    })

    await newEmail?.save()
    console.log("email saved successfully ", content.email)
}