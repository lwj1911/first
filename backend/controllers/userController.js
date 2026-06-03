const User = require("../models/User");
const { success, error } = require("../utils/response");

// 注册
exports.register = async (req, res) => {
    const { username, password } = req.body;

    // 空值校验
    if (!username || !password) {
        return error(res, "用户名和密码不能为空");
    }

    // 用户名必须是手机号或邮箱
    const isPhone = /^1[3-9]\d{9}$/.test(username);
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);
    if (!isPhone && !isEmail) {
        return error(res, "用户名必须是手机号或邮箱");
    }

    // 密码：8-16位，只能由数字和字母构成
    if (password.length < 8 || password.length > 16) {
        return error(res, "密码长度必须为8-16位");
    }
    if (!/^[a-zA-Z0-9]+$/.test(password)) {
        return error(res, "密码只能由数字和字母构成");
    }
    if (!/[a-z]/.test(password)) {
        return error(res, "密码必须包含小写字母");
    }
    if (!/[0-9]/.test(password)) {
        return error(res, "密码必须包含数字");
    }

    // 检查用户名是否已被注册
    const exists = await User.findOne({ username });
    if (exists) {
        return error(res, "该账号已被注册");
    }

    // 创建用户，注册成功返回 201
    await User.create({ username, password });
    return success(res, { message: "注册成功" }, 201);
};

// 登录
exports.login = async (req, res) => {
    const { username, password } = req.body;

    // 空值校验
    if (!username || !password) {
        return error(res, "用户名和密码不能为空");
    }

    // 查找用户
    const user = await User.findOne({ username });
    if (!user) {
        return error(res, "账号不存在");
    }

    // 校验密码
    if (user.password !== password) {
        return error(res, "密码错误");
    }

    return success(res, { username: user.username });
};
