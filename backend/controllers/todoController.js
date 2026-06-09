const Todo = require("../models/Todo");
const { success, error } = require("../utils/response");

// 获取指定列表的所有 todos（按创建时间倒序）
exports.getTodos = async (req, res) => {
    const list = req.query.list || "todolist1";
    const todos = await Todo.find({ list }).sort({ createTime: -1 });
    return success(res, todos);
};

// 新增一条 todo
exports.createTodo = async (req, res) => {
    const list = req.query.list || "todolist1";
    const { text } = req.body;
    // 内容不能为空
    if (!text || !text.trim()) {
        return error(res, "待办事项内容不能为空");
    }

    const todo = await Todo.create({ list, text });
    return success(res, todo, 201);
};

// 根据 ID 删除一条 todo
exports.deleteTodo = async (req, res) => {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
        return error(res, "待办事项不存在", 404);
    }
    return success(res, { message: "删除成功" });
};

// 根据 ID 修改一条 todo
exports.updateTodo = async (req, res) => {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!todo) {
        return error(res, "待办事项不存在", 404);
    }
    return success(res, todo);
};
