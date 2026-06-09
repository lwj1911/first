const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema({
    token: { type: String, required: true, unique: true },  // RT 本身
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    expiresAt: { type: Date, required: true },  // 过期时间，MongoDB 自动清理
});

// 自动删除过期 token：创建 TTL 索引
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("RefreshToken", refreshTokenSchema);
