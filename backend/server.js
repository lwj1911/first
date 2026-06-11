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
    origin: function (origin, callback) {
        // 允许 localhost（开发）和 vercel（上线）
        const allowed = [
            "http://localhost:5173",
            "http://localhost:3000",
        ];
        // vercel 域名或没有 origin 的请求也放行
        if (!origin || origin.endsWith(".vercel.app") || allowed.includes(origin)) {
            callback(null, true);
        } else {
            callback(null, true);  // 临时全放行，开发阶段
        }
    },
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
