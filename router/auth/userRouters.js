import express from 'express';
import { registerUser } from '../../controller/auth/usercontroller.js';


const userRouter = express.Router();


// GET Methods




// POST Methods
userRouter.post('/regiter', registerUser);



// PUT Methods





// DELETE Methods





export default userRouter;