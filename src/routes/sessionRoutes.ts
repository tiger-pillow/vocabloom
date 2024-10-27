import { Router } from 'express';
import { getSessionCard } from '../controllers/sessionControllers.js'

const sessionRouter = Router();

sessionRouter.post("/getSessionCard", getSessionCard);


export default sessionRouter;

