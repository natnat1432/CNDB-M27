require("dotenv").config();

module.exports = {
  SERVER_URL: process.env.SERVER_URL,
  CLIENT_URL: process.env.CLIENT_URL,
  BASE_PATH: process.env.BASE_PATH,
  API_PORT: process.env.SERVER_PORT,
  HTTP_PROTOCOL: process.env.HTTP_PROTOCOL || "http://",
  NODE_ENV: process.env.NODE_ENV,
  ACCESS_TOKEN_SECRET:process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET:process.env.REFRESH_TOKEN_SECRET,
};