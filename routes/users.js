var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

router.get("/get/:id", userController.get);
router.post("/login", userController.login);
router.post("/register", userController.register);
router.put("/:id", userController.update);

module.exports = router;
