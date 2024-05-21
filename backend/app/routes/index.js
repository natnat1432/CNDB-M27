const AuthRoutes = require("./auth");
const RecordRoutes = require("./records");
const { BASE_PATH } = require("../config/server");

module.exports = (app) => {
    //API Endpoints
    app.use(BASE_PATH + "auth", AuthRoutes);
    app.use(BASE_PATH + "records", RecordRoutes);
}


