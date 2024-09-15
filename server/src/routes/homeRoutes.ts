import { Router } from 'express';
import {getCardsByType, getAllCards} from '../controllers/cardControllers.js';

const homeRouter = Router();
homeRouter.get("/vocablist", async (req, res) => {
    const data = await getAllCards();
    res.send(JSON.stringify(data));
});

export default homeRouter;