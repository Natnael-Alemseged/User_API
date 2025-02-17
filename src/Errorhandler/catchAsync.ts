import {Request, Response, NextFunction, Errback} from 'express'


export const catchAsync = (fn: any) => {
    return (req: Request, res: Response, next: NextFunction) => { // ! add a way to check error comes from catch
        fn(req, res, next).catch((err: any) => next(err));
    };
};