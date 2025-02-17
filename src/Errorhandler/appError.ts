class AppError extends Error {
    public statusCode: number;
    public status: string;
    public isOperational: boolean;
    public customMessage:string;
    public success: boolean;

    constructor(statusCode: number, message: string) {
        super(message);
        this.success=false;
        this.customMessage = message || "error";
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}
export default AppError;
