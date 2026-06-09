const { verifyToken } = require("../utils/jwt");

// 认证中间件：放在需要保护的路由前面
function auth(req, res, next) {
    // 1. 从请求头里取 token
    //    前端发请求时带：Authorization: Bearer <token>
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "未登录，请先登录",
        });
    }

    const token = header.split(" ")[1];

    try {
        // 2. 验证 token
        const decoded = verifyToken(token);
        // 把用户信息挂在 req 上，controller 可以直接用 req.user
        req.user = decoded;
        next();
    } catch (err) {
        // 3. token 无效或过期
        return res.status(401).json({
            success: false,
            message: "登录已过期，请重新登录",
        });
    }
}

module.exports = auth;
