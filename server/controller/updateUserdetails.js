import UserDetailToken from '../helper/UserDetailToken.js';
import UserModel from '../models/UserModel.js';

const updateUserdetails = async (request, response) => {
    try {
        const token = request.cookies.token || "";
        const user = await UserDetailToken(token);

        const { name, profile_pic } = request.body;
        await UserModel.updateOne({ _id: user._id }, { name, profile_pic });
        const userInformation = await UserModel.findById(user._id);

        return response.json({
            message: "user updated successfully",
            data: userInformation,
            success: true
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true
        });
    }
};

export default updateUserdetails;
