const authService = require("../services/auth");
const { REFRESH_TOKEN_SECRET } = require("../config/auth");
const { hashPassword } = require("../utils/util");
const {
  BadRequestError,
  NotFoundError,
  DuplicateError,
} = require("../errors/customErrors");

const jwt = require("jsonwebtoken");
const db = require("../models");
const Accounts = db.Accounts;
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");

const authController = {
  //*
  //* Log in user
  //*
  async loginUser(req, res) {
    const cookies = req.cookies;
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    const checkAccount = await authService.verifyUser(req);

    if (!checkAccount) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Log in" });
    }

    const validatePassword = await bcrypt.compare(
      password,
      checkAccount.password
    );

    if (!validatePassword) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Log in" });
    }

    if (cookies?.jwt) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
    }

    const user = { username: username };
    const accessToken = authService.generateAccessToken(user);
    const refreshToken = authService.generateRefreshToken(user);
    let userData = checkAccount.dataValues;
    delete userData.password;

    // Creates Secure Cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken, user: userData });
  },
  //*
  //* Register user
  //*
  async registerUser(req, res, next) {
    try {
      const { username, password, firstname, lastname } = req.body;
      if (!username || !password || !firstname || !lastname) {
        throw new BadRequestError("Incomplete fields");
      }

      const checkAccount = await Accounts.findOne({
        where: { username: username },
        attributes: ["id", "username", "password"],
      });

      if (checkAccount) {
        throw new DuplicateError("Username already exists");
      }

      const hashedPassword = await hashPassword(password);

      await Accounts.create({
        username: username,
        password: hashedPassword,
        firstname: firstname,
        lastname: lastname,
      });

      return res.status(StatusCodes.OK).send({
        message:
          "Account registered successfully. Please wait for the admin to approve your registration.",
      });
    } catch (error) {
      next(error);
    }
  },
  //*
  //* Requesting another access token
  //*

  async refreshToken(req, res) {
    const cookies = req.cookies;
    const refreshToken = cookies.jwt;
    if (!cookies?.jwt) {
      return res.sendStatus(401);
    }

    if (!refreshToken) {
      return res.status(401).json({ message: "No token included" });
    }

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: "Token invalid" });
      const accessToken = authService.generateAccessToken({
        username: user.username,
      });
      return res.json({
        message: "Refresh token success",
        accessToken: accessToken,
      });
    });
  },

  //*
  //* Validate access token
  //*

  async validateToken(req, res) {
    const accessToken = req.body.accessToken;
    if (!accessToken) {
      return res.status(401).json({ valid: false });
    }
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json({ valid: false });
      else return res.status(202).json({ valid: true });
    });
  },

  //*
  //* Log out user
  //*

  async invalidateToken(req, res) {
    const refreshToken = req.headers["token"];
    if (!refreshToken)
      return res
        .status(404)
        .json({ success: false, message: "Empty refresh token" });
    return res.status(200).json({ message: "Log out success" });
  },
};
module.exports = authController;
