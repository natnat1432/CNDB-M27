const  router = require("express").Router();
const authController = require("../controllers/auth");

router.post("/login", authController.loginUser);
router.get("/token", authController.refreshToken);

module.exports = router;
