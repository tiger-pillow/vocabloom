import { Router } from 'express';
import { addMotherCard, getCardsByTypeStatus , updateCardStatus} from '../controllers/adminControllers.js';
import { createDeck } from '../controllers/adminControllers.js';
const adminRouter = Router();

// get all cards 

adminRouter.post("/getCardsByTypeStatus", getCardsByTypeStatus)
adminRouter.post("/updateCardStatus", updateCardStatus)
adminRouter.post("/addCard", addMotherCard)
adminRouter.post("/createDeck", createDeck)


export default adminRouter