import { NounCard, VerbCard, ConjugateCard } from "../schemas/motherCardSchema.js";
import { deleteMotherCard, changeMotherCardStatus, getMotherCardByType } from "./DBhelper.js";

export async function getCardsByTypeStatus (req:any, res: any) {
    var data;

    try {
        data = await getMotherCardByType(req.body.requestType)
        res.send(JSON.stringify(data))
    } catch (error) {
        console.error('Error retrieving VerbCards:', error);
        throw new Error('Could not fetch verb cards');
    }
};

export async function updateCardStatus(req: any, res: any) {
    console.log("called updateCardStatus action is ", req.body.action)
    switch (req.body.action) {
        case "delete": 
            await deleteMotherCard(req.body.card)
        case "changeStatus": 
            await changeMotherCardStatus(req.body.card)
    }
    let newdata = await getMotherCardByType(req.body.requestType)
    res.send(JSON.stringify(newdata))
    
}

export async function addMotherCard(req: any, res: any) { 
    let newCard
    let content = req.body
    if (content.type === "verb") {
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
    try {
        await newCard?.save()
        return 200
    } catch (err) {
        console.log("unable to save card ", err)
        return 501
    }

}