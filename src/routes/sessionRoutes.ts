import { Router } from 'express';
import { getSessionCard } from '../controllers/sessionControllers'

const sessionRouter = Router();

// post feedback, get new card 

sessionRouter.post("/getSessionCard", getSessionCard );


export default sessionRouter;

