import { Router } from 'express';
import {getCardsByType, getAllCards} from '../controllers/cardControllers.js';

const homeRouter = Router();
homeRouter.get("/vocablist", async (req, res) => {
    const data = await getAllCards();
    res.send(JSON.stringify(data));
});


homeRouter.post("/addCard", async (req, res) => {
    console.log("add card data from front end", req.body)
})

export default homeRouter;