const compression = require("compression");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {
  BASE_PATH,
  NODE_ENV,
  API_PORT,
  CLIENT_URL,
} = require("./app/config/server");
const { errorHandleMiddleware } = require("./app/middlewares/errorHandler.js");

require("dotenv").config();

const app = express();

const corsOptions = {
  origin: CLIENT_URL,
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(compression()); //compresses all responses
app.use(cookieParser()); // allow node to read cookies
app.use(express.static("public")); // invoking the config for dotenv
app.use(cors(corsOptions)); // set cors
app.use(express.json()); // Parse requests of content-type - application/json
app.use(express.urlencoded({ extended: true })); // Parse requests of content-type - application/x-www-form-urlencoded
app.use(errorHandleMiddleware);

app.get("/", (req, res) => {
  res.json({ message: "Greetings!" });
});

require("./app/routes/index")(app); //API V1 Routes

app.use("*", (req, res) => {
  res.status(404).json({ message: "Route does not exist!" });
});



const port = API_PORT || 3000;

app.listen(port, () => {
  console.log(`Listening at post ${port}`);
});
