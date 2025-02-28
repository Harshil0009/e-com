const ErrorHandler = require("../utils/errorhander");


module.exports = (err , req , res, next) =>{

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server Error";

    // Wrong Mongodb Id error
    if(err.name === "CastError"){
        const message  =  `resource not found . invalid: ${err.path}`;
        err = new ErrorHandler(message , 400);
    }

    // mongoose Duplicate Key Error
    if(err.code === 11000){
        const message = `The ${Object.keys(err.keyValue)} Is Already registered`
        err = new ErrorHandler(message , 401);
    }

    // Wrong JWT error
    if(err.name === "JsonWebTokenError"){
        const message  =  `Json Web Token is Invalid , Try Again`;
        err = new ErrorHandler(message , 400);
    }

    // JWT Expire Error
    if(err.name === "TokenExpiredError"){
        const message  =  `Json Web Token is Expired , Try Again`;
        err = new ErrorHandler(message , 400);
    }


    res.status(err.statusCode).json({
        success : false,
        message : err.message,
    });
}                                           