const ErrorHandler = require("../utils/errorhander");


module.exports = (err , req , res, next) =>{

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server Error";

    res.status(err , statusCode).json({
        success : false,
        error : err.message,
    });
}