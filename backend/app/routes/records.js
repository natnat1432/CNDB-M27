const router = require("express").Router()
const recordsController = require("../controllers/records");
const { authenticateToken } = require("../middlewares/authentication");
const uploadFile = require("../middlewares/upload");

router.route("/")
      .post(authenticateToken,uploadFile.single("file"), recordsController.create)
      .get(authenticateToken, recordsController.findAll)

router.get("/count/all", authenticateToken, recordsController.countAll);

module.exports = router;