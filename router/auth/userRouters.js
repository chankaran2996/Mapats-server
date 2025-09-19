import express from 'express';
import { 
    getUserProfile,
    loginUser, 
    registerUser, 
    setPassword 
} from '../../controller/auth/usercontroller.js';
import { protect } from '../../middleware/authMiddleware.js';


const userRouter = express.Router();


// GET Methods
userRouter.get('/profile', protect, getUserProfile);


// POST Methods
userRouter.post('/register', registerUser);

userRouter.post('/login', loginUser);

userRouter.post('/set-password/:token', setPassword);



// PUT Methods





// DELETE Methods





export default userRouter;