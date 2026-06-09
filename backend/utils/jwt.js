const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "todo_app_secret_key_2024";

// Access Token：短命（15分钟），每次请求带
function signAccessToken(payload) {
    return jwt.sign(payload, SECRET, { expiresIn: "15m" });
}

// Refresh Token：长命（7天），只用来换新的 AT
function signRefreshToken(payload) {
    return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

// 验证 token（AT 和 RT 都用同一个密钥验证）
function verifyToken(token) {
    return jwt.verify(token, SECRET);
}

module.exports = { signAccessToken, signRefreshToken, verifyToken };
