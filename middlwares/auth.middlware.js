import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import User from '../models/user.model.js';

const authorize = async (req, res, next) => {
    try {
        let token;

        // Check if Authorization header exists and starts with Bearer
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'Not authorized to access this route' });
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Find the user and attach to req object
        const user = await User.findById(decoded.userID).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Authorization Error:', error);
        res.status(401).json({ message: 'Not authorized to access this route' });
    }
};

export default authorize;
