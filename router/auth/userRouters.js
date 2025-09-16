import express from 'express';
import { loginUser, registerUser } from '../../controller/auth/usercontroller.js';


const userRouter = express.Router();


// GET Methods




// POST Methods
userRouter.post('/register', registerUser);

userRouter.post('/login', loginUser);



// PUT Methods





// DELETE Methods





export default userRouter;