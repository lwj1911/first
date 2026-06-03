const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/todo_db");
    console.log("MongoDB连接成功");
};
module.exports = connectDB;
