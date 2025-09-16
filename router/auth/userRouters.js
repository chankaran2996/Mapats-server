import express from 'express';
import { 
    loginUser, 
    registerUser, 
    setPassword 
} from '../../controller/auth/usercontroller.js';


const userRouter = express.Router();


// GET Methods




// POST Methods
userRouter.post('/register', registerUser);

userRouter.post('/login', loginUser);

userRouter.post('/set-password/:token', setPassword);



// PUT Methods





// DELETE Methods





export default userRouter;