const mongoose = require("mongoose");

const connectDB = async () => {
    const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/todo_db";
    console.log("MONGO_URI:", uri.replace(/:[^:@]+@/, ":****@"));
    try {
        await mongoose.connect(uri, {
            tlsAllowInvalidCertificates: true,  // 解决 Render + Atlas 的 TLS 兼容问题
        });
        console.log("MongoDB连接成功");
    } catch (err) {
        console.error("MongoDB连接失败:", err.message);
    }
};

module.exports = connectDB;
