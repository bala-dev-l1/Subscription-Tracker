import { Router } from "express";
const authrouter = Router();
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";


//path: /api/v1/auth/sign-up (post)
authrouter.post('/sign-up',signUp);
//path: /api/v1/auth/sign-in (post)
authrouter.post('/sign-in',signIn);
//path: /api/v1/auth/sign-out (post)
authrouter.post('/sign-out',signOut);
export default authrouter; 