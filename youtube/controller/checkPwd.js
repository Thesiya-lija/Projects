import UserModel from '../models/UserModel.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const checkPwd = async (request, response) => {
    try {
        const { password, userId } = request.body;
        const user = await UserModel.findById(userId);
        const verifyPassword = await bcryptjs.compare(password, user.password);
        if (!verifyPassword) {
            return response.status(400).json({
                message: "Please check password",
                error: true
            });
        }           
        const tokenData = {
            id: user._id,
            email: user.email
        };
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        const cookieOption = {
            httpOnly: true,
            secure: true,
        };
        return response.cookie('token', token, cookieOption).status(200).json({
            message: "Login Successfully",
            token: token,
            success: true
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true
        });
    }
};

export default checkPwd;
