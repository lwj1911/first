const mongoose = require("mongoose");

const connectDB = async () => {
    const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/todo_db";
    await mongoose.connect(uri);
    console.log("MongoDB连接成功");
};

module.exports = connectDB;
