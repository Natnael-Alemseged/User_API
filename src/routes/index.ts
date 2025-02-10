import express, {Request, Response} from 'express';
import user from "./user";

const router = express.Router();


router.get('/', (req: Request, res: Response) => {
    res.status(200).send('successful, Home Page');
});


router.use(user);


export default router;