import express from 'express';
import { getCurrentUser, loginUser, registerUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/',getCurrentUser)
export default userRouter;