import mongoose from "mongoose";
import NounCard from "../schemas/nouncardSchema.js";
import VerbCard from "../schemas/verbcardSchema.js";
import ConjugateCard from "../schemas/conjugateCardSchema.js";

export async function getCardsByType(cardType: string) {
    var data;
    try {
        // Fetch all documents from the VerbCards collection
        if (cardType == "verb") {
            data = await VerbCard.find();
        } else if (cardType == "noun") {
            data = await NounCard.find();
        } else if (cardType == "conjugate") {
            data = await ConjugateCard.find();
        }
        return data; // Return the retrieved documents
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

export async function addCard(content: {type:string, word: string, definition: string, examples: Array<[string, string]>}){
    let newCard
    if (content.type === "verb"){
        newCard = new VerbCard({
            type: "verb",
            word: content.word,
            definition: content.definition,
            examples: content.examples
        })

    }
    else if (content.type === "noun") {
        newCard = new NounCard({
            type: "noun", 
            word: content.word, 
            definition: content.definition,
            examples: content.examples
        })
    }
    await newCard?.save() 
    console.log ("new Card ", content.word, "saved successfully")
}       
    