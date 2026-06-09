const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

// Mongoose 中间件：save 之前自动执行
// 把明文密码加密后再存入数据库
userSchema.pre("save", async function () {
    // 如果密码没被修改过（比如修改用户名时），跳过加密
    if (!this.isModified("password")) return;

    // bcrypt.hash：给密码加盐(salt) + 哈希，不可逆
    // 第二个参数 10 是加密强度（2^10=1024 轮哈希）
    this.password = await bcrypt.hash(this.password, 10);
    // Mongoose 9 的 async 钩子不需要调 next()，自动继续
});

// 给 Model 挂一个方法：比较明文密码和数据库里的密文是否匹配
userSchema.methods.comparePassword = function (plainPassword) {
    return bcrypt.compare(plainPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
