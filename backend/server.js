const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");
const userRoutes = require("./routes/userRoutes");
const testRoutes = require("./routes/testRoutes");
const errorHandler = require("./middleware/errorHandler");
const app = express();
app.use(cors());
app.use(express.json());

// 连接MongoDB
connectDB();

// 挂载路由 —— 统一使用 /api 前缀
app.use("/api/todos", todoRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tests", testRoutes);

// 全局错误处理 —— 必须放在所有路由之后
app.use(errorHandler);

app.listen(3000, () => {
    console.log("server running");
});
