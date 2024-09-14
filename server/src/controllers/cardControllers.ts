import mongoose from "mongoose";
import NounCard from "./nouncardSchema";
import VerbCard from "./verbcardSchema";
import ConjugateCard from "./conjugateCardSchema";

export default async function getAllCards(cardType: string) {
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
