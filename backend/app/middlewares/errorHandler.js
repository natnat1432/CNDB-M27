const { StatusCodes } = require("http-status-codes");

exports.errorHandleMiddleware = (err, req, res, next) => {
    console.error(err.stack); // Log the full error stack for debugging
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = err.message || "Something went wrong, try again later";
    res.status(statusCode).json({ message });
};