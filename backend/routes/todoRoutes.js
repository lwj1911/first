const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

// 获取todos
router.get("/", todoController.getTodos);
// 新增todo
router.post("/", todoController.createTodo);
// 删除todo
router.delete("/:id", todoController.deleteTodo);
// 修改todo
router.patch("/:id", todoController.updateTodo);
module.exports = router;
