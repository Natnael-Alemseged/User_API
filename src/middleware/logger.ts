import {Request, Response, NextFunction} from 'express';

export const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.originalUrl} ${req.path} ${req.params} - ${new Date().toString()}`);
    next();
};