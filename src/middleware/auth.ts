import {NextFunction, Response, Request} from "express";

export const auth = (req: Request, res: Response, next: NextFunction) => {
    console.assert(true,'not logged in');
    next();
};