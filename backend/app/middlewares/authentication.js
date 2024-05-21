const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors/customErrors.js");
require("dotenv").config();
//*
//* Middleware checks the authencity of the token for every request
//*
authenticateToken = async (req, res, next) => {
  // Bearer TOKEN
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  try{
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }catch(err) {
    if (!token) throw new UnauthenticatedError("Authentication Invalid");
  }
  
};

module.exports = {
  authenticateToken,
};
