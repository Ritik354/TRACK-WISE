import express from 'express';

import { getUserDetails, loginUser,registerUser, updateUserPassword, updateUserProfile } from '../controller/userController.js';
import { authMiddleware } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

//protected route to get user details
userRouter.get('/me', authMiddleware, getUserDetails);
userRouter.put('/profile', authMiddleware, updateUserProfile);
userRouter.put('/password', authMiddleware, updateUserPassword);

export default userRouter;