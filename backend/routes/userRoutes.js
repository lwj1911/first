const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// 注册
router.post("/", userController.register);
// 登录
router.post("/login", userController.login);
// 刷新 token
router.post("/refresh", userController.refresh);
// 退出登录
router.post("/logout", userController.logout);

module.exports = router;
