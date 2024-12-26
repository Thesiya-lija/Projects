import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true  
    },   
    
    password: {
        type: String,
        required: true
    },
    profile_pic: {
        type: String,
        required: false
    }
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
