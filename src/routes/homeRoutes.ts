import { Router } from 'express';
import { protect } from '../middleware/authMid.js';
import { joinWaitlist, signUp, login, me } from '../controllers/userControllers.js';
import { addMotherCard, getCardsByTypeStatus, createDeck, updateCardStatus, getDecks } from '../controllers/adminControllers.js';
import { getSessionCard } from '../controllers/sessionControllers.js'

const homeRouter = Router();

// get all cards 

homeRouter.post("/getCardsByTypeStatus", getCardsByTypeStatus)
homeRouter.post("/updateCardStatus", updateCardStatus)
homeRouter.post("/addCard", addMotherCard)
homeRouter.post("/createDeck", createDeck)
homeRouter.get("/getDecks", getDecks)



homeRouter.post("/getSessionCard", protect, getSessionCard);
homeRouter.post("/waitlist", joinWaitlist)
homeRouter.post("/signup", signUp)
homeRouter.post("/login", login)
homeRouter.get("/me", protect, me)

export default homeRouter;