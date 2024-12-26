import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js'; // Ensure the path is correct

const UserDetailToken = async (token) => {
    if (!token) {
        return {
            message: "session out",
            logout: true,
        };
    }

    try {
        const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await UserModel.findById(decode.id);
        return user;
    } catch (error) {
        console.error('Error verifying token:', error);
        return {
            message: error.message || "An error occurred",
            logout: true,
        };
    }
};

export default UserDetailToken;
