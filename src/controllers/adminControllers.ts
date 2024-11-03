import { NounCard, VerbCard, ConjugateCard} from "../schemas/motherCardSchema.js";
import { deleteMotherCard, getMotherCardByType, getMotherCardById } from "./adminDBhelper.js";
import { Deck } from "../schemas/deckSchema.js";

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
    let motherCard, deck
    switch (req.body.action) {
        case "delete": 
            await deleteMotherCard(req.body.card)
            break;
        case "changeStatus": 
            motherCard = await getMotherCardById(req.body.card._id, req.body.card.type) as any;
            if (motherCard) {
                let newStatus = motherCard.status === "active" ? "dormant" : "active"
                motherCard.status = newStatus
                await motherCard.save()
            }
            break;
        case "addDeck":
            motherCard = await getMotherCardById(req.body.card._id, req.body.card.type) as any;
            deck = await Deck.findById(req.body.deck_id) as any;
            if (motherCard && deck) {
                motherCard.decks.push([deck.deck_name, req.body.deck_id])
                motherCard.markModified('decks');
                deck.mothercards.push(motherCard._id)
                deck.deck_size += 1
                deck.markModified('mothercards')
                deck.markModified('deck_size')
                await deck.save()
                await motherCard.save();
            } else {
                console.log("Mother card not found");
            }
            break;
        case "removeDeck":
            motherCard = await getMotherCardById(req.body.card._id, req.body.card.type) as any;
            deck = await Deck.findById(req.body.deck_id) as any;
            if (motherCard && deck) {
                motherCard.decks = motherCard.decks.filter((deck:any) => deck[1] !== req.body.deck_id)
                deck.mothercards = deck.mothercards.filter((card_id: any) => card_id.toString() !== req.body.card._id)
                deck.deck_size -= 1
                deck.markModified('mothercards')
                deck.markModified('deck_size')
                await deck.save()
                await motherCard.save()
            }
            break;
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


export async function getDecks(req: any, res: any) {
    let decks = await Deck.find()
    res.send(JSON.stringify(decks))
}


export async function createDeck(req: any, res: any) {
    let newDeck = new Deck({
        deck_name: req.body.deck_name,
        deck_description: req.body.deck_description,
        decksize: 0,
        usercount: 0,
        mothercards: []
    })
    await newDeck.save()
    res.send(JSON.stringify(newDeck))
}

