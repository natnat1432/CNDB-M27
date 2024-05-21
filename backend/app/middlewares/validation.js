const { body, param, validationResult } = require("express-validator");
const { BadRequestError } = require("../errors/customErrors.js");

exports.withValidationErrors = (validateValues) => {
    return [
        validateValues,
        (req, res, next) => {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
              const errorMessages = errors.array().map((error) => error.msg);
              throw new BadRequestError(errorMessages);
            }
            next();
        }
    ]
}