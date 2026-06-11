const mongoose = require("mongoose");

const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    const finalUri = uri && uri !== "mongodb://127.0.0.1:27017/todo_db"
        ? uri
        : "mongodb://127.0.0.1:27017/todo_db";
    console.log("MONGO_URI:", finalUri.replace(/:[^:@]+@/, ":****@"));
    try {
        await mongoose.connect(finalUri);
        console.log("MongoDB连接成功");
    } catch (err) {
        console.error("MongoDB连接失败:", err.message);
    }
};

module.exports = connectDB;
