import UserModel from "../models/user_model.js";
import jwt from "jsonwebtoken";
import bcryt from "bcrypt";
import "dotenv/config";
import Joi from "joi";
// Validation schema for signup
const signupSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required(),
    password: Joi.string().min(6).required(),
});

// Validation schema for login
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export async function signup(req, res) {
    try {
        // Validate request body
        const { error } = signupSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: false,
                message: error.details[0].message,
            });
        }
        const { username, email, phone, password } = req.body;

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                status: false,
                message: "User already exists",
            });
        }

        // Hash password
        const hashPassword = await bcryt.hash(password, 10);

        // create a new user
        const newUser = new UserModel({
            username,
            email,
            phone,
            password: hashPassword,
        });
        // save the user
        await newUser.save();

        return res.status(201).json({
            status: true,
            message: "User registered successfully",
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            error: error.message,
        });
    }
}

export async function login(req, res) {
    try {
        // Validate request body
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: false,
                message: error.details[0].message,
            });
        }

        const { email, password } = req.body;

        // Find user
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({
                status: false,
                message: "User not found",
            });
        }

        // Verify password
        const validPassword = await bcryt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                status: false,
                message: "Invalid password",
            });
        }
        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" },
        );

        // Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3600000,
            secure: process.env.NODE_ENV === "production",
        });

        return res.status(200).json({
            status: true,
            message: "Login successful",
            token,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            error: error.message,
        });
    }
}

export async function verifyToken(req, res, next) {
    try {
        const token =
            req.cookies?.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                status: false,
                message: "No token provided",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            status: false,
            message: "Invalid or expired token",
            error: error.message,
        });
    }
}

export async function logout(req, res) {
    try {
        res.clearCookie("token");
        return res.status(200).json({
            status: true,
            message: "Logout successful",
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            error: error.message,
        });
    }
}
