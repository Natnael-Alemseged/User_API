import {Request, Response, NextFunction} from 'express';

// Error-handling middleware
export const errorHandler = (err: Error & { statusCode?: number }, req: Request, res: Response, next: NextFunction) => {


    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        message: err.message,  // Display the error message
        status: statusCode,
    });
};


// console.error(err.stack);
// console.log('error happened');
// res.status(500).send({ message: 'Something went wrong!', error: err.message });
// error: err,  // Full error object (for debugging, etc.)
