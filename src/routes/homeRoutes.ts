import { Router } from 'express';
import { protect } from '../middleware/authMid.js';
import { joinWaitlist, signUp, login, me } from '../controllers/userControllers.js';
const homeRouter = Router();


import { getSessionCard } from '../controllers/sessionControllers.js'


homeRouter.post("/getSessionCard", getSessionCard);

homeRouter.post("/waitlist", joinWaitlist)

homeRouter.post("/signup", signUp)

homeRouter.post("/login", login)

homeRouter.get("/me", protect, me)

export default homeRouter;