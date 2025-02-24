class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message); // Call parent Error class constructor
        this.statusCode = statusCode; // Assign statusCode property

        // Capture stack trace (for debugging)
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler;