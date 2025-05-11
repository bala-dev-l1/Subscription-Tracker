import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            const error = new Error("user not found");
            error.statusCode = 404;
            throw error;
        }
        
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal Server Error" });
    }
};
