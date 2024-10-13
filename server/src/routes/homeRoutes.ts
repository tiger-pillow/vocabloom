import { Router } from 'express';
import {getCardsByType, getAllCards, addCard} from '../controllers/cardControllers.js';

const homeRouter = Router();
homeRouter.get("/vocablist", async (req, res) => {
    const data = await getAllCards();
    res.send(JSON.stringify(data));
});


homeRouter.post("/addCard", async (req, res) => {
    console.log(req.body)
    addCard(req.body).then((res) => 
        console.log("saved card, ", res))
    }
)

export default homeRouter;