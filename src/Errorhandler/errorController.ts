import AppError from "./appError";
import { Request, Response, NextFunction } from "express";
import { DatabaseError, UniqueConstraintError, ValidationError } from "sequelize";

// ✅ Handle Sequelize Validation Error
const handleSequelizeValidationError = (err: ValidationError) => {
    const messages = err.errors.map((error) => error.message);
    return new AppError(400, `Invalid input data: ${messages.join(". ")}`);
};

// ✅ Handle Sequelize Unique Constraint Error
const handleSequelizeUniqueConstraintError = (err: UniqueConstraintError) => {
    const field:string = err.errors[0]?.path || "unknown field";
    const value:string = err.errors[0]?.value || "unknown value";
    const message = `Duplicate field value: '${value}' for '${field}'. Please use another value!`;

    return new AppError(400, message);
};


// ✅ Handle Sequelize General Database Errors
const handleSequelizeDatabaseError = (err: DatabaseError) => {
    return new AppError(500, `Database error: ${err.message}`);
};

// ✅ Handle MongoDB Cast Error
const handleCastErrorDB = (err: any) => {
    return new AppError(400, `Invalid ${err.path}: ${err.value}.`);
};

// ✅ Handle MongoDB Duplicate Fields Error
const handleDuplicateFieldsDB = (err: any) => {
    const key: string = Object.keys(err.keyValue).join(", ");
    const value: string = Object.values(err.keyValue).join(", ");
    return new AppError(400, `Duplicate field value for key(s): ${key} with value(s): ${value}. Please use another value!`);
};

// ✅ Handle MongoDB Validation Error
const handleValidationErrorDB = (err: any): AppError => {
    const errors = Object.values(err.errors).map((el: any) => el.message);
    return new AppError(400, `Invalid input data. ${errors.join(". ")}`);
};

// ✅ Handle JWT Errors
const handleJWTError = () => new AppError(401, "Invalid token. Please log in again!");
const handleJWTExpiredError = () => new AppError(401, "Your token has expired! Please log in again.");

// ✅ Development Mode Error Response
const sendErrorDev = (err: any, req: Request, res: Response) => {
    return res.status(err.statusCode || 500).json({
        status: err.status || "error",
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

// ✅ Production Mode Error Response
const sendErrorProd = (err: any, req: Request, res: Response) => {
    if (err.type === "entity.parse.failed") {
        return res.status(400).json({ status: "error", message: "Invalid JSON format in request body" });
    }
    if (err.isOperational) {
        return res.status(err.statusCode).json({ status: err.status, message: err.message });
    }
    console.error("ERROR 💥", err);
    return res.status(500).json({ status: "error", message: "Something went very wrong!" });
};

// ✅ Global Error Handler Middleware
export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    let error = err;

    if (err instanceof ValidationError) error = handleSequelizeValidationError(err);
    if (err instanceof UniqueConstraintError) error = handleSequelizeUniqueConstraintError(err);
    if (err instanceof DatabaseError) error = handleSequelizeDatabaseError(err);
    if (err.name === "CastError") error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDuplicateFieldsDB(err);
    if (err.name === "ValidationError") error = handleValidationErrorDB(err);
    if (err.name === "JsonWebTokenError") error = handleJWTError();
    if (err.name === "TokenExpiredError") error = handleJWTExpiredError();

    if (process.env.NODE_ENV === "development") {
        sendErrorDev(error, req, res);
    } else {
        sendErrorProd(error, req, res);
    }
};
