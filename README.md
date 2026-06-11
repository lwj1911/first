# TodoList

全栈 Todo 应用，已完成从本地开发 → 云部署的完整闭环。前端 Vercel + 后端 Render + 数据库 Atlas。

---

## 项目进度总览

| 模块 | 状态 | 说明 |
|------|------|------|
| 前端 Todo CRUD | ✅ 完成 | 添加/删除/编辑/切换完成/多列表/搜索/筛选 |
| 前端彩蛋 | ✅ 完成 | Witch 诅咒模式、Love 逃跑按钮 |
| 用户系统 | ✅ 完成 | 注册（手机号/邮箱校验）+ 登录 + 退出 |
| JWT 双 Token | ✅ 完成 | AT(15min) + RT(7d) 滚动刷新；httpOnly Cookie 防 XSS |
| 密码加密 | ✅ 完成 | bcrypt 哈希存储 |
| 路由权限 | ✅ 完成 | React Router + ProtectedRoute 守卫；后端 auth 中间件 |
| 前端部署 | ✅ 完成 | Vercel 自动部署，SPA rewrite 配置 |
| 后端部署 | ✅ 完成 | Render Web Service，dotenv+环境变量管理 |
| 云数据库 | ✅ 完成 | MongoDB Atlas M0 免费集群 |
| 未来 | ⬜ 待做 | useContext/Zustand 状态管理、TypeScript 迁移、Redis 缓存、CI/CD |

---

## 核心功能如何实现

### 1. JWT 双 Token 认证（AT + RT）

这是项目最复杂的部分，也是面试最有价值的模块。

**后端文件（按实现顺序）：**
- `backend/utils/jwt.js` — 签发和验证函数（`signAccessToken` 15min、`signRefreshToken` 7d、`verifyToken`）
- `backend/models/RefreshToken.js` — RT 存 MongoDB，支持服务端主动删除（踢人）+ TTL 自动过期
- `backend/models/User.js` — `pre-save` 钩子 bcrypt 自动加密密码；`comparePassword` 实例方法
- `backend/middleware/auth.js` — Express 中间件：从 `Authorization: Bearer <token>` 头取 AT → `jwt.verify` → 挂 `req.user` → 放行/401
- `backend/controllers/userController.js` — login 返回 AT(in body) + RT(in httpOnly Cookie)；refresh 从 Cookie 读 RT → 删旧换新（滚动刷新）；logout 删 RT
- `backend/routes/userRoutes.js` — `/` 注册、`/login`、`/refresh`、`/logout`
- `backend/server.js` — `app.use("/api/todos", auth, todoRoutes)` 保护 todo 路由

**前端文件（按实现顺序）：**
- `frontend/src/services/userService.js` — `loginUser` 存 AT 到 localStorage；`authFetch` 自动带 AT；401 自动调 `tryRefresh`；`refreshPromise` 防并发重复刷新
- `frontend/src/services/todoService.js` — 所有请求改用 `authFetch`，不再手动带 token
- `frontend/src/hooks/useLogin.js` — 登录存 `currentUser` 到 localStorage；退出清空
- `frontend/src/guards/ProtectedRoute.jsx` — 检查 localStorage 有 AT → 渲染子组件；无 → `<Navigate to="/">`
- `frontend/src/pages/LoginPage.jsx` — 打开时检查 localStorage 有 token → 直接跳 `/main`；无 → 显示登录表单

**关键设计决策：**
- AT 存 localStorage（跨域环境 Cookie 送不过去），RT 存 httpOnly Cookie（`sameSite: "none"` + `secure: true` 支持跨域）
- 滚动刷新：换 AT 时旧 RT 被删除并签发新 RT → 一个 RT 只能换一次 → RT 被盗后攻击者和合法用户抢换，慢的被踢
- `refreshPromise` 防并发：多个请求同时 401 只会发一次刷新请求，其他等待

### 2. 前端四层架构

```
component（渲染层）→ hooks（逻辑层）→ services（请求层）→ 后端 API
                 ↑ 状态、校验、调 service    ↑ 纯 fetch 封装
```

- **component** 只负责展示和事件绑定，不写业务逻辑
- **hook** 持有所有 state，处理校验、调用 service、管理副作用
- **service** 只管"发 HTTP 请求"，返回 JSON，不管业务
- 独立组件内部调 hook（模式 A），多组件共享数据在 App.jsx 调 hook（模式 B）

### 3. 后端分层架构

```
routes → controllers → models → MongoDB
  ↑ 指路     ↑ 干活      ↑ 结构
```

- **routes** 只管 URL 和方法匹配
- **controllers** 处理请求逻辑、调用 Model
- **models** 定义 Schema + 钩子 + 方法
- **middleware** 横切关注点（auth 认证、errorHandler 错误兜底）
- **utils** 工具函数（jwt 签发验证、response 统一格式）

### 4. 密码安全

注册时 `User.pre("save")` → `bcrypt.hash(明文, 10)` 加密后存入数据库。登录时 `bcrypt.compare(明文, 密文)` 比对，从不存明文密码。

### 5. 部署架构

```
用户 → Vercel(前端静态文件) → Render(Express API) → Atlas(MongoDB)
       vercel.app 域名          onrender.com 域名       云数据库
```

- Vercel: `vercel.json` 配置 Root Directory `frontend` + SPA rewrite
- Render: Environment Variables 注入 `MONGO_URI` + `JWT_SECRET`
- Atlas: IP 白名单 `0.0.0.0/0` + Database User 认证

---

## 重要技术决策

### Mongoose 版本
- **线上用 Mongoose 8**：Mongoose 9 在 Render 环境下与 Atlas TLS 握手不兼容（`ERR_SSL_TLSV1_ALERT_INTERNAL_ERROR`），降级到 8 解决
- 本地开发可用 9

### 跨域 Cookie
- `sameSite: "none"` + `secure: true` 才能让 httpOnly Cookie 跨域发送
- 前端必须传 `credentials: "include"`
- 后端 CORS `origin` 不能是 `*`，必须指定具体域名

### localStorage vs httpOnly Cookie
- AT 不得已用 localStorage（短命 15min，丢了也影响有限）
- RT 用 httpOnly Cookie（JS 读不到，XSS 偷不走），这是安全底线

### 筛选状态不持久化
- 之前 `localStorage.setItem("filter", f)` 导致刷新后筛选项残留，用户以为数据丢了
- 已改为每次刷新默认 `"all"`

---

## 本地启动

```bash
# 后端
cd backend && npm install && npm start    # http://localhost:3000

# 前端
cd frontend && npm install && npm run dev # http://localhost:5173

# 需要本地 MongoDB 运行在 27017，或者修改 .env 里的 MONGO_URI
```

---

## 线上地址

- 前端：Vercel 部署的域名
- 后端 API：`https://first-fafk.onrender.com/api`
- 数据库：MongoDB Atlas `cluster0.adbgtn3.mongodb.net`

---

## 技术栈

| 层 | 技术 | 版本 |
|------|------|------|
| 前端框架 | React | 19 |
| 构建工具 | Vite | 8 |
| 路由 | react-router-dom | 6 |
| 后端框架 | Express | 5 |
| ODM | Mongoose | 8（线上）/ 9（本地） |
| 认证 | jsonwebtoken + bcryptjs | 9 / 3 |
| Cookie 解析 | cookie-parser | 1 |
| 环境变量 | dotenv | 17 |
| 数据库 | MongoDB Atlas | M0 免费 |
| 前端部署 | Vercel | 免费 |
| 后端部署 | Render | 免费 |

---

## 作者

nana
