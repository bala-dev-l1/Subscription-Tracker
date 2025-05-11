import {Router} from 'express';
import { getAllUsers, getUser } from '../controllers/user.controller.js';
import authorize from '../middlwares/auth.middlware.js';
const userRouter= Router();
userRouter.get('/',getAllUsers);
userRouter.get('/:id',authorize,getUser);
userRouter.post('/',(req,res)=>res.send({title:"CREATE new user"}))
userRouter.put('/:id',(req,res)=>res.send({title:"PUT update  user"}))
userRouter.delete('/:id',(req,res)=>res.send({title:"DELETE user"}))
export default userRouter;