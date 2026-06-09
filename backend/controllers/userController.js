const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");
const { success, error } = require("../utils/response");
const { signAccessToken, signRefreshToken, verifyToken } = require("../utils/jwt");

// cookie 通用配置：7天，JS 读不到
const COOKIE_OPTIONS = {
    httpOnly: true,       // JS 无法通过 document.cookie 读取
    secure: false,        // 本地开发用 HTTP，上线改成 true
    sameSite: "lax",      // 允许同站 + 顶部导航携带
    maxAge: 7 * 24 * 60 * 60 * 1000,  // 7天
};

// 注册
exports.register = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return error(res, "用户名和密码不能为空");

    const isPhone = /^1[3-9]\d{9}$/.test(username);
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);
    if (!isPhone && !isEmail) return error(res, "用户名必须是手机号或邮箱");

    if (password.length < 8 || password.length > 16) return error(res, "密码长度必须为8-16位");
    if (!/^[a-zA-Z0-9]+$/.test(password)) return error(res, "密码只能由数字和字母构成");
    if (!/[a-z]/.test(password)) return error(res, "密码必须包含小写字母");
    if (!/[0-9]/.test(password)) return error(res, "密码必须包含数字");

    const exists = await User.findOne({ username });
    if (exists) return error(res, "该账号已被注册");

    await User.create({ username, password });
    return success(res, { message: "注册成功" }, 201);
};

// 登录 → AT 返回在 JSON，RT 放 httpOnly Cookie
exports.login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return error(res, "用户名和密码不能为空");

    const user = await User.findOne({ username });
    if (!user) return error(res, "账号不存在");

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return error(res, "密码错误");

    const payload = { userId: user._id, username: user.username };

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    // RT 存入数据库
    const decoded = verifyToken(refreshToken);
    await RefreshToken.create({
        token: refreshToken,
        userId: user._id,
        expiresAt: new Date(decoded.exp * 1000),
    });

    // RT 设成 httpOnly cookie，只在后端可见
    res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);

    // AT 仍然返回在 JSON body 里，前端自己管
    return success(res, { username: user.username, accessToken });
};

// 刷新：从 cookie 里读 RT，换新后也用 cookie 下发新 RT
exports.refresh = async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return error(res, "缺少 Refresh Token", 401);

    let decoded;
    try {
        decoded = verifyToken(refreshToken);
    } catch (err) {
        return error(res, "Refresh Token 无效或已过期", 401);
    }

    const stored = await RefreshToken.findOne({ token: refreshToken });
    if (!stored) {
        return error(res, "Refresh Token 已被注销，请重新登录", 401);
    }

    await RefreshToken.deleteOne({ token: refreshToken });

    const payload = { userId: decoded.userId, username: decoded.username };
    const newAccessToken = signAccessToken(payload);
    const newRefreshToken = signRefreshToken(payload);

    const newDecoded = verifyToken(newRefreshToken);
    await RefreshToken.create({
        token: newRefreshToken,
        userId: decoded.userId,
        expiresAt: new Date(newDecoded.exp * 1000),
    });

    res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);
    return success(res, { accessToken: newAccessToken });
};

// 退出登录 → 清 cookie + 删数据库 RT
exports.logout = async (req, res) => {
    const { refreshToken } = req.cookies;
    if (refreshToken) {
        await RefreshToken.deleteOne({ token: refreshToken });
    }
    res.clearCookie("refreshToken");
    return success(res, { message: "已退出" });
};
