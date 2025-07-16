export class CustomError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.name = 'CustomError';
        this.status = statusCode;
    }
}

export function globalErrorHandler(err, req, res, next) {
    console.error(err)
    res.status(err.status ?? 500).send('Error processing your request.')
}