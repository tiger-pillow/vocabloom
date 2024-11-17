import EmailSchema from "../schemas/emailSchema.js";
import { User, ChildDeck, Deck } from "../schemas/deckSchema.js";
import jwt from 'jsonwebtoken';

export async function joinWaitlist(req: any, res: any){
    try{
        const newEmail = new EmailSchema({
            email: req.body.email
        })
        await newEmail?.save()
        console.log("email saved successfully ", req.body.email)
    } catch (error) { 
        console.log("join waitlist error")
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
    
}

const generateToken = (_id: any) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET as string, {
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

        console.log("signup req body: ", req.body)

        // initiate a child deck
        const chosenDeck = await Deck.findById(req.body.deck_id)
        const childDeck = await new ChildDeck({
            motherdeck_id: req.body.deck_id,
            motherdeck_name: chosenDeck?.deck_name || '',
            time_started: new Date(Date.now()),
            progress_index: 0,
            current: true,
            studied_mothercards: []
        }).save()

        // create new user
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            daily_limit: req.body.daily_limit,
            new_card_limit: req.body.new_card_limit,
            current_child_deck: childDeck._id,
            child_decks: []
        }).save()

        console.log("new user saved: ", newUser)

        // generate token
        const token = generateToken(newUser._id);
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
                _id: newUser._id, 
                username: newUser.username, 
                role: newUser.role,
                email: newUser.email
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
                email: user.email,
                role: user.role
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
    try {
        res.status(200).json({ success: true, user: req.user })
      
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}