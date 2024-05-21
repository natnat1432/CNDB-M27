const { StatusCodes } = require("http-status-codes");

exports.errorHandleMiddleware = (err, req, res, next ) => {
  console.error(err);
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || "Something went wrong, try again later";
  res.status(statusCode).json({ message: msg });
}