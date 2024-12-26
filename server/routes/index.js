import express from 'express';
import registerUser from '../controller/registerUser.js';
import checkEmail from '../controller/checkEmail.js';
import checkPassword from '../controller/checkPwd.js';
import userDetail from '../controller/userDetail.js';
import updateUserdetails from '../controller/updateUserdetails.js'; // Ensure this path is correct
import SearchUser from '../controller/SearchUser.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/email', checkEmail);
router.post('/password', checkPassword);
router.get('/user-detail', userDetail);
router.post('/update-user', updateUserdetails); 
router.post("/search-user",SearchUser)
export default router;
