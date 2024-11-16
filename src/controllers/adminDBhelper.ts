import mongoose, { SortOrder, Types} from "mongoose";
import { NounCard, VerbCard, ConjugateCard } from "../schemas/motherCardSchema.js";


export async function deleteMotherCard(card:any) {
    try {
        switch (card.type) {
            case "noun":
                card = await NounCard.findByIdAndDelete({ _id: card._id }).exec()
                break
            case "verb":
                card = await VerbCard.findById(card._id).exec()
                break
            case "conjugate":
                card = await ConjugateCard.findById(card._id).exec()
                break
        }
        return 200
    } catch (error){ 
        console.log("deleteMotherCard() error ", error)
        return 500
    }
}


export async function getMotherCardByType(type: string, status: string = "all", sort: number = -1){ 
    let data 
    try {
        switch (type) {
            case "noun":
                data = await NounCard.find().sort({ time_created: sort as SortOrder });
                break;

            case "verb":
                data = await VerbCard.find().sort({ time_created: sort as SortOrder });
                break;
            case "conjugate": 
                data = await ConjugateCard.find().sort({ time_created: sort as SortOrder });
            default:
                break;
        }
        if (status === "active") { 
            data = data?.filter((card) => card.status === "active")
        }
    
        return data
    } catch (error) {
        console.log("getMotherCardByType() error ", error)
        return []
    }
    
    
}

export async function getMotherCardById(id: Types.ObjectId, type: string){
    try {
        let data 
        switch (type) {
        case "noun": 
            data = await NounCard.findById(id).exec()
            break
        case "verb": 
            data =  await VerbCard.findById(id).exec()
            break
        case "conjugate": 
            data =  await ConjugateCard.findById(id).exec()
            break
        }
        return data
    } catch (error) {
        console.log("getMotherCardById() error ", error)
        return null
    }
}
