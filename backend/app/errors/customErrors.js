const { StatusCodes } = require("http-status-codes");

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

class DuplicateError extends Error{
  constructor(message) {
    super(message);
    this.name = "DuplicateError";
    this.statusCode = StatusCodes.CONFLICT;
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

class UnauthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
  DuplicateError,
};
