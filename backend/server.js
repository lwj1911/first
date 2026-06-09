require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");
const userRoutes = require("./routes/userRoutes");
const testRoutes = require("./routes/testRoutes");
const auth = require("./middleware/auth");
const errorHandler = require("./middleware/errorHandler");
const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// 连接MongoDB
connectDB();

// 公开路由（不需要登录）
app.use("/api/users", userRoutes);
app.use("/api/test", testRoutes);

// 受保护路由（需要登录，auth 中间件挡在前面）
app.use("/api/todos", auth, todoRoutes);

// 全局错误处理
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("server running on port " + PORT);
});
