import { Router } from 'express';
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

homeRouter.post("/api/register", async (req, res) => {})

export default homeRouter;