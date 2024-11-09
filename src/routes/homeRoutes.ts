import { Router } from 'express';
import { joinWaitlist, signUp, login } from '../controllers/userControllers.js';
const homeRouter = Router();

import { getSessionCard } from '../controllers/sessionControllers.js'


homeRouter.post("/getSessionCard", getSessionCard);

homeRouter.post("/waitlist", joinWaitlist)

homeRouter.post("/signup", signUp)

homeRouter.post("/login", login)

export default homeRouter;