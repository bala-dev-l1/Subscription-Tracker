import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

export const signUp = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { name, email, password } = req.body;
        const existinguser = await User.findOne({ email });
        if (existinguser) {
            const error = new Error('user already exists');
            error.statusCode = 409;
            throw error;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create([{ name, email, password: hashedPassword }], { session });
        const token = jwt.sign({ userID: newUser[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        await session.commitTransaction();
        session.endSession();
        res.status(201).json({
            status: 'success',
            message: 'user created',
            data: {
                token,
                user: newUser[0]
            }
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(error.statusCode || 500).json({ message: error.message || "Internal Server Error" });
    }
};

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error('user not found');
            throw error;
        }
        const ispasswordCorrect = await bcrypt.compare(password, user.password);
        if (!ispasswordCorrect) {
            const error = new Error('incorrect password');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({ userID: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.status(200).json({
            status: 'success',
            message: 'user logged in',
            data: {
                token,
                user
            }
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal Server Error" });
    }
};

export const signOut = async (req, res) => {
    res.send("welcome");
};
