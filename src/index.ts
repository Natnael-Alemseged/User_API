import express, {NextFunction, Request, Response} from 'express';
import cors from 'cors';

import router from 'express';
import route from '../src/routes/index';
import {logger} from "./middleware/logger";
import {globalErrorHandler } from "./Errorhandler/errorController";

import {connectDB, createDatabase} from "./config/db";
import AppError from "./Errorhandler/appError";


const app = express();


app.use(express.json());
app.use(cors());

connectDB();

// createDatabase();

app.use(logger);

app.use(router());
app.use(express.urlencoded({extended: true}));
app.use(route);
// app.use(errorHandler);

app.use("*", (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(404, `can't find ${req.originalUrl} on our server`));
});

app.use(globalErrorHandler);

app.listen(3000, () => {
    console.log('Server started on port 3000')
});



