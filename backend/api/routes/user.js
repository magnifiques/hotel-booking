const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.get("/", userController.getUsers);
router.post("/", userController.addUsers);
module.exports = router;
