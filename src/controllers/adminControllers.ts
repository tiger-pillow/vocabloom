import mongoose from "mongoose";
import { NounCard, VerbCard, ConjugateCard } from "../schemas/motherCardSchema.js";

export async function getCardsByTypeStatus(cardType: string, status: string = "all") {
    var data;
    try {
        // Fetch all documents from the VerbCards collection
        if (cardType == "verb") {
            data = await VerbCard.find().sort({ time_added: -1 });
        } else if (cardType == "noun") {
            data = await NounCard.find().sort({time_added: -1});
        } else if (cardType == "conjugate") {
            data = await ConjugateCard.find().sort({ time_added: -1 });
        }

        if (status === "active"){
            data = data?.filter((card) => {
                return card.status === "active";
            })
        }
        
        return data
    } catch (error) {
        console.error('Error retrieving VerbCards:', error);
        throw new Error('Could not fetch verb cards');
    }
};

export async function getAllCards(){
    try {
        const verbData = await VerbCard.find();
        const nounData = await NounCard.find();
        const conjugateData = await ConjugateCard.find();
        const combined = [...nounData, ...verbData, ...conjugateData];
        return combined;
    } catch (error) {
        console.error('Error retrieving cards:', error);
        throw new Error('Could not fetch cards');
    }
}

export async function addCard(content: {type:string, word: string, definition: string, examples: Array<[string, string]>, examplesTranslation: string}){
    let newCard
    if (content.type === "verb"){
        newCard = new VerbCard({
            type: "verb",
            word: content.word,
            definition: content.definition,
            examples: content.examples,
            status: "active",
            examplesTranslation: content.examplesTranslation,
        })

    }
    else if (content.type === "noun") {
        newCard = new NounCard({
            type: "noun", 
            word: content.word, 
            definition: content.definition,
            examples: content.examples,
            status: "active",
            examplesTranslation: content.examplesTranslation,
        })
    }
    try{
        await newCard?.save() 
        return 200
    } catch (err){
        console.log("unable to save card ", err)
        return 501
    }
    
    
}       
    