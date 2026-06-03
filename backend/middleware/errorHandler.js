// 全局错误处理中间件
// 注意: Express 靠 4 个参数来识别错误处理中间件，一个都不能少
function errorHandler(err, req, res, next) {
    console.error("[Error]", err.message || err);

    // Mongoose 校验失败 (字段缺失/格式不对)
    if (err.name === "ValidationError") {
        const messages = Object.values(err.errors).map((e) => e.message);
        return res.status(400).json({
            success: false,
            message: messages.join("; "),
        });
    }

    // Mongoose ObjectId 格式不对
    if (err.name === "CastError" && err.kind === "ObjectId") {
        return res.status(400).json({
            success: false,
            message: "ID 格式不正确",
        });
    }

    // MongoDB 11000 唯一键冲突 (如用户名重复)
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue).join(", ");
        return res.status(409).json({
            success: false,
            message: `${field} 已存在`,
        });
    }

    // 兜底: 服务器内部错误
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "服务器内部错误",
    });
}

module.exports = errorHandler;
