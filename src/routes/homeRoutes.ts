import { Router } from 'express';
import { getAllCards, addCard} from '../controllers/adminControllers.js';
import { addEmail } from '../controllers/userControllers.js';
import {NounCard, VerbCard, ConjugateCard} from "../schemas/motherCardSchema.js";
const homeRouter = Router();





homeRouter.post("/waitlist", async (req, res) => {
    console.log("waitlist submitted", req.body);
    addEmail({email: req.body.email}).then((res) => {
        console.log("added email route level")
    }).then(()=>{
        res.sendStatus(200)
    })
})


export default homeRouter;