const dbConfig = require("../config/database");
const Sequelize = require("sequelize");

const { createSuperAdmin } = require("../utils/initDB");

require("dotenv").config();

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.PORT,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

//*
//* Initializing Database Models
//*

//Accounts
db.Accounts = require("./Accounts.js")(sequelize, Sequelize);

db.Records = require("./Records.js")(sequelize,Sequelize);

//*
//* Synchronize the database, creating tables if they don't exist
//*

sequelize
  .sync()
  .then(() => {
    console.log("Tables are all created");
    createSuperAdmin(db.Accounts);
  })
  .catch((error) => {
    console.error("Unable to create tables: ", error);
  });

module.exports = db;


