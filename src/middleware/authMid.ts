import jwt from "jsonwebtoken"
import {User} from "../schemas/deckSchema.js"

export async function protect(req: any, res: any, next: any) {
    try {
        // if no cookie attached
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ success: false, message: "Not authorized to access this route" })
        }

        // check cookie validity
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload
            req.user = await User.findById(decoded._id)
            next()

        } catch (error) {
            console.log("token verification error: ", error)
            return res.status(401).json({ success: false, message: "Not authorized to access this route" })
        }
    } catch (error) {
        console.log("protect error", error)
        res.status(401).json({ success: false, message: "Not authorized to access this route" })
    }
}