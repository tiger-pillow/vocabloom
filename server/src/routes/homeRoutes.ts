import { Router } from 'express';
import  getAllCards from '../controllers/cardControllers';

const router = Router();
router.get("/vocablist", async (req, res) => {
    const data = await getAllCards("noun");
    console.log("/vocablist", data);
    res.send(data);
});

export { router as homeRouter };