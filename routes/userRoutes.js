import express from 'express';
import { loginUser, registerUser } from '../controllers/userController.js';
import { rateLimiting } from '../middlewares/authMiddleware.js';

const userRoute = express.Router();

console.log("USER ROUTE ĐƯỢC LOAD");

userRoute.route('/register').post(rateLimiting, registerUser);
userRoute.route('/login').post(rateLimiting, loginUser);

export default userRoute;