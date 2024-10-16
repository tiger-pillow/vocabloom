import { Router } from 'express';
import {getCardsByType, getAllCards, addCard} from '../controllers/cardControllers.js';
import { addEmail } from '../controllers/userControllers.js';

const homeRouter = Router();
homeRouter.get("/vocablist", async (req, res) => {
    const data = await getAllCards();
    res.send(JSON.stringify(data));
});


homeRouter.post("/addCard", async (req, res) => {
    console.log(req.body)
    addCard(req.body).then((res) => 
        console.log("added card, ", res))
    }
)

homeRouter.post("/waitlist", async (req, res) => {
    console.log("waitlist submitted", req.body);
    addEmail({email: req.body.email}).then((res) => {
        console.log("added email route level")
    }).then(()=>{
        res.sendStatus(200)
    })
})


export default homeRouter;