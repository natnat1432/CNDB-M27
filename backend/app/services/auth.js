const {
    REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_SECRET
} = require("../config/server");

const jwt = require("jsonwebtoken");
const db = require("../models");
const accounts = db.Accounts;

const authService = {
    async verifyUser(req) {
      const { username, password } = req.body;
  
      const checkAccount = await accounts.findOne({
        where: { username: username },
        attributes:["id", "username", "password"],
      });
      return checkAccount;
    },

    //*
    //* Generate access token
    //*
    
    generateAccessToken(user) {
      return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
    },
    //*
    //* Generate refresh token
    //*
    generateRefreshToken(user) {
      return jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
    },
  };
  
  module.exports = authService;
  

