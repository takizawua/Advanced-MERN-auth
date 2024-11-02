import { User }  from '../models/user.model.js';
import { generateVerificationToken } from '../utils/genarateVerificaionToken.js'
import { generateTokenAndSetCookies } from '../utils/generateTokenAndSetCookies.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        if (!email || !password || !name) {
            return res.status(404).json({ success: false, message: "All fields are required" });
        }

        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = generateVerificationToken();
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
        })

        await user.save();

        generateTokenAndSetCookies(res, user._id);

        sendVerificaionEmail(user.email, verificationToken);

        res.status(401).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        });

    } catch (error) {
        console.error("Database error: ", error);
        return res.status(400).json({ success: false, message: error.message })
    }
}

export const login = async (req, res) => {
    res.send("login route");
}

export const logout = async (req, res) => {
    res.send("logout route");
}