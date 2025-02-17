import {Request, Response, NextFunction} from 'express';

// Error-handling middleware
export const errorHandler = (err: Error & { statusCode?: number }, req: Request, res: Response, next: NextFunction) => {


    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        message: err.message,  // Display the error message
        status: statusCode,

    });
};


