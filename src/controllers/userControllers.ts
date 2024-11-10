import EmailSchema from "../schemas/emailSchema.js";
import { User } from "../schemas/deckSchema.js";
import jwt from 'jsonwebtoken';

export async function joinWaitlist(req: any, res: any){
    const newEmail = new EmailSchema({
        email: req.body.email
    })
    await newEmail?.save()
    console.log("email saved successfully ", req.body.email)
}

const generateToken = (id: any) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

export async function signUp(req: any, res: any) {
    try {
        // check if already exists
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({
                success: false, 
                message: "User already exists"
            }); 
        }
        // create new user
        user = new User(req.body)
        await user.save()
        console.log("new user saved: ", user)

        // generate token
        const token = generateToken(user._id);
        const options = {
            expires: new Date(Date.now() + Number(process.env.JWT_COOKIE_EXPIRE) * 3600 * 1000),
            httpOnly: true,
            secure: false,
        }
        if (process.env.NODE_ENV === 'production') {
            options.secure = true;
        }

        res.status(201).cookie("token", token, options).json({
            success: true, 
            token, 
            user: {
                _id: user._id, 
                username: user.username, 
                email: user.email
            }
        });
    
    } catch (error) {
        res.status(500).json({
            success: false, 
            message: "Server error"
        })
    }

}
   
export async function login(req: any, res: any) {
    try { 
        console.log("login attempt with:", req.body);
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({
                success: false,
                message: "Please provide an email and password"
            });
        }

        const user = await User.findOne({ email: req.body.email }).select("+password");
        console.log("user found:", user)
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const isMatch = await user.comparePassword(req.body.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = generateToken(user._id);
        const options = {
            expires: new Date(Date.now() + Number(process.env.JWT_COOKIE_EXPIRE) * 3600 * 1000),
            httpOnly: false,
            secure: false,
        }
        if (process.env.NODE_ENV === 'production') {
            options.secure = true;
        }

        res.status(200).cookie("token", token, options).json({
            success: true, 
            message: "login success",
            token, 
            user: {
                _id: user._id, 
                username: user.username, 
                email: user.email
            }
        });
        console.log("backend login success")
        
    } catch (error) {
        res.status(500).json({
            success: false, 
            message: "Server error"
        })
    }

}

export async function me(req: any, res: any) {
    // get current user
    console.log("me req.user: ", req.user)
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            user: {
                _id: user._id, 
                username: user.username, 
                email: user.email
            }
        })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}