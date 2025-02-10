import express, {Request, Response} from 'express';
import cors from 'cors';

import router from 'express';
import route from '../src/routes/index';
import {logger} from "./middleware/logger";
import {errorHandler} from "./middleware/errorHandler";
import {connectDB} from "./config/db";

const app = express();


app.use(express.json());
app.use(cors());

connectDB();

app.use(logger);

app.use(router());
app.use(express.urlencoded({extended: true}));
app.use(route);
app.use(errorHandler);

app.listen(3000, () => {
    console.log('Server started on port 3000')
});



