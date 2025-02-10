import express, {Request, Response, Router} from 'express';
import {createUser, deleteUser, getUsers, updateUser} from "../controllers/userController";
import {auth} from "../middleware/auth";

const router: Router = express.Router();


router.post('/user',  createUser).get('/user', getUsers).delete('/user/:id', deleteUser).patch('/user/:id', updateUser);

export default router;

