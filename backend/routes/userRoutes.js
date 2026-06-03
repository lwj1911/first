const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// 注册
router.post("/", userController.register);
// 登录
router.post("/login", userController.login);

module.exports = router;
