import UserModel from '../models/UserModel.js';  // Added .js to the import statement

async function SearchUser(request, response) {
    try {
        const { search } = request.body;
        const query = new RegExp(search, "i");
        const user = await UserModel.find({
            "$or": [
                { name: query },
                { email: query }
            ]
        }).select("-password")

        return response.json({
            message: "all user",
            data: user,
            success: true
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true
        });
    }
}

export default SearchUser;
