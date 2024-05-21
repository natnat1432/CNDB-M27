require("dotenv").config();

module.exports = {
    HOST: process.env.db_HOST,
    USER: process.env.db_USER,
    PASSWORD: process.env.db_PASSWORD,
    PORT: process.env.db_PORT,
    DB: process.env.db_DB,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };
  