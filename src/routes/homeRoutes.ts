import { Router } from 'express';
import {getCardsByTypeStatus, getAllCards, addCard} from '../controllers/adminControllers.js';
import { addEmail } from '../controllers/userControllers.js';
import {NounCard, VerbCard, ConjugateCard} from "../schemas/motherCardSchema.js";
const homeRouter = Router();


homeRouter.get("/userCards", async (req, res) => {
    const data = await getCardsByTypeStatus("noun", "active");
    res.send(JSON.stringify(data));
});


homeRouter.post("/adminCards", async (req, res) => {
    const data = await getCardsByTypeStatus(req.body.type, "all");
    res.send(JSON.stringify(data))
});

homeRouter.post("/addCard", async (req, res) => {
    const result = await addCard(req.body)
    res.sendStatus(result)
})

homeRouter.post("/deleteCard", async (req, res) => {
    let card
    switch (req.body.type) {
        case "noun":
            card = await NounCard.findByIdAndDelete({ _id: req.body._id }).exec()
            break 
        case "verb":
            card = VerbCard.findById(req.body._id).exec()
        case "conjugate":
            card = ConjugateCard.findById(req.body._id).exec()
        default:
            res.sendStatus(501)
    }
    let data = await getCardsByTypeStatus(req.body.type, "all")
    res.status(200).send(data)
})

homeRouter.post("/changeStatus", async(req, res) => {
    let card
    switch (req.body.type) {
        case "noun":
            card = await NounCard.findById(req.body._id).exec()
            break;
        case "verb":
            card = await VerbCard.findById(req.body._id).exec()
            break;
        case "conjugate":
            card = await ConjugateCard.findById(req.body._id).exec()
        default:
            res.sendStatus(501)
        }

    if (card){
        let newStatus = card.status === "active" ? "dormant" : "active"
        card.status = newStatus
        await card.save()
        let data = await getCardsByTypeStatus(req.body.type, "all")
        res.status(200).send(data)
    } else {
        res.sendStatus(501)
    }
    
})


homeRouter.post("/waitlist", async (req, res) => {
    console.log("waitlist submitted", req.body);
    addEmail({email: req.body.email}).then((res) => {
        console.log("added email route level")
    }).then(()=>{
        res.sendStatus(200)
    })
})


export default homeRouter;