import { NounCard, VerbCard, ConjugateCard} from "../schemas/motherCardSchema.js";
import { deleteMotherCard, changeMotherCardStatus, getMotherCardByType, getMotherCardById } from "./adminDBhelper.js";


import { Deck } from "../schemas/deckSchema.js";

export async function createDeck(req: any, res: any) {
    let newDeck = new Deck({
        deck_name: req.body.deck_name,
        deck_description: req.body.deck_description,
    })
    await newDeck.save()
    res.send(JSON.stringify(newDeck))
}

// FIXME: https://stackoverflow.com/questions/64607253/typescript-and-mongoose-property-x-does-not-exist-on-type-document 
// Read this tomorrow 
export async function changeMotherCardDeck(req: any, res: any) {
    try {
        const card = await getMotherCardById(req.body.card._id, req.body.card.type) as any;
        if (!card) {
            return res.status(404).send("Card not found");
        }
        if (!card.decks) {  // if the card has no decks, create an empty array
            card.decks = []
        }

        card.decks.push([req.body.deckname, req.body.deck_id])
        
        await card.save();
        res.status(200).json(card);

    } catch (error) {
        console.error("Error in changeMotherCardDeck:", error);
        res.status(500).send("Internal server error");
    }
}


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
        case "changeDeck":

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

