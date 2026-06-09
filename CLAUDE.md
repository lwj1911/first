# Project Context

This is a full-stack Todo application.

## Tech Stack

Frontend:

* React
* Vite
* Axios

Backend:

* Node.js
* Express

Database:

* MongoDB
* Mongoose

Tools:

* Git
* Apifox

## Project Structure

```
frontend/
backend/
```

Backend follows:

```
config/
models/
controllers/
routes/
middleware/
```

项目结构和代码要保持规范，严格按照分层架构组织。

## Coding Rules

* Use ES Module syntax.
* Use async/await instead of Promise chains.
* Use meaningful variable names.
* Keep functions small and focused.
* 注释可以适当多一些，帮助阅读者理解代码逻辑。
* Follow RESTful API conventions.
* 项目结构和代码要保持规范。

## API Design Rules

```
GET    /api/todos       获取待办列表
POST   /api/todos       新增待办
PATCH  /api/todos/:id   修改待办
DELETE /api/todos/:id   删除待办
POST   /api/users       注册
POST   /api/users/login 登录
```

Success response format:

```json
{
  "success": true,
  "data": {}
}
```

Error response format:

```json
{
  "success": false,
  "message": "Error message"
}
```

## Database Rules

Use Mongoose models.

Example collections:

* User
* Todo

Avoid direct MongoDB queries when a Mongoose model can be used.

## Future Features

* JWT Authentication
* Role Based Access Control (RBAC)
* Redis Cache
* AI Assistant
* Learning Planning Module
* Docker Deployment

## Assistant Instructions

When generating code:

1. Follow existing project structure.
2. Prefer maintainable code over clever code.
3. Explain major architectural decisions.
4. Suggest best practices when appropriate.
5. Do not introduce unnecessary libraries.
6. Keep beginner-friendly explanations.
7. 每次开头第一句话用一个可爱的颜文字，例如 (●'◡'●) 或 (๑•̀ㅂ•́)و✧。
8. 默认使用中文与用户交流，包括解释、说明、提问等，除非用户主动使用英文。
9. 安装新 skill 时，使用全局安装。
10. 需要获取权限时，使用中文提示用户。

The project owner is a student learning full-stack development and preparing for internships.
Provide production-oriented guidance while keeping explanations understandable.

When helping with code or answering questions:
- 不仅修复问题，更要解释**为什么**这样做，背后的原理是什么
- 主动指出学习中需要掌握的**关键知识点**，帮助建立完整的知识体系
- 遇到通用模式时，点明这是**面试常考题**或**工作中必会技能**
- 前后端、数据库、部署 — 帮助打通各层之间的关联，培养全栈思维
- 适时推荐学习路径：下一步该学什么、这个知识点属于哪个阶段
- 鼓励写代码而不是复制粘贴，引导先思考再动手
- 代码规范、安全意识、性能优化 — 从学习阶段就养成好习惯

---

## 全栈学习路线图

### 🟢 第一阶段：前端基础（当前进度 ~65%）

| 知识点 | 状态 | 学会的标准 |
|--------|------|----------|
| HTML / CSS 基础 | ✅ 已学 | 能手写页面布局 |
| JavaScript ES6+ | ✅ 已学 | 解构、箭头函数、async/await 熟练用 |
| Git 基本操作 | ✅ 已学 | init / add / commit / push / pull |
| JSX 语法 | ✅ 已学 | 项目里到处在用 |
| 函数组件 | ✅ 已学 | `function Test() {}` |
| Props 传参 | ✅ 已学 | `function Test({ text })` |
| useState | ✅ 已学 | 受控组件、表单绑定 |
| 条件渲染 | ✅ 已学 | `filter === 'done' && ...` |
| 列表渲染 .map() | ✅ 已学 | `todos.map(t => <TodoItem>)` |
| 自定义 Hook | ✅ 已学 | `useTodos`、`useTest`、`useTest2` |
| 前后端分层架构 | ✅ 已学 | service → hooks → component → App.jsx |
| **useEffect** | ⬜ 待学 | 理解副作用、依赖数组、cleanup |
| **useRef** | ⬜ 待学 | DOM 引用、保存不变值 |
| **useContext** | ⬜ 待学 | 全局数据，不传 props |
| **React Router** | ⬜ 待学 | 多页面路由跳转 |
| **useMemo / useCallback** | ⬜ 待学 | 性能优化基础 |

---

### 🟡 第二阶段：后端 & 数据库（当前进度 ~40%）

| 知识点 | 状态 | 学会的标准 |
|--------|------|----------|
| Express 路由 | ✅ 已学 | RESTful API 设计 |
| Mongoose Model | ✅ 已学 | User、Todo Schema |
| Controller 模式 | ✅ 已学 | 分层：routes → controllers → models |
| 中间件 | ✅ 已学 | errorHandler、cors |
| CRUD 完整操作 | ✅ 已学 | 增删改查 + 列表切换 |
| 用户注册/登录 | ⚠️ 纯文本 | 需要升级为 JWT |
| **JWT 认证** | ⬜ 待学 | token 签发、验证、过期处理 |
| **密码加密（bcrypt）** | ⬜ 待学 | 绝不能明文存密码 |
| **数据校验** | ⬜ 待学 | express-validator 或 joi |
| **文件上传** | ⬜ 待学 | multer + 静态资源 |
| **MongoDB 索引** | ⬜ 待学 | 查询加速、唯一索引 |
| **MongoDB Atlas** | ⬜ 待学 | 云数据库，告别 localhost |

---

### 🟠 第三阶段：工程化（当前进度 ~20%）

| 知识点 | 状态 | 学会的标准 |
|--------|------|----------|
| npm 包管理 | ✅ 已学 | `npm install`、package.json |
| Vite 构建工具 | ✅ 已学 | `npm run build` |
| ESLint 代码规范 | ⚠️ 已装 | 理解规则含义，会自定义 |
| **环境变量 .env** | ⬜ 待学 | 敏感信息不在代码里硬编码 |
| **CORS 深入理解** | ⬜ 待学 | 为什么跨域、怎么解决 |
| **错误处理最佳实践** | ⬜ 待学 | try/catch、全局错误中间件 |
| **日志系统** | ⬜ 待学 | morgan / winston |

---

### 🔵 第四阶段：部署 & DevOps（当前进度 ~15%）

| 知识点 | 状态 | 学会的标准 |
|--------|------|----------|
| Vercel 前端部署 | ✅ 已学 | Git 推送自动部署 |
| GitHub 使用 | ✅ 已学 | push / pull / 远程仓库 |
| **后端部署（Render/Railway）** | ⬜ 待学 | 让后端也上线，手机能用 |
| **Docker 容器化** | ⬜ 待学 | Dockerfile、docker-compose |
| **Nginx 反向代理** | ⬜ 待学 | 前后端同一域名 |
| **HTTPS / 域名** | ⬜ 待学 | SSL 证书、DNS 解析 |
| **CI/CD 自动部署** | ⬜ 待学 | push 代码自动测试+上线 |

---

### 🟣 第五阶段：进阶 & 面试（当前进度 ~5%）

| 知识点 | 状态 | 重要性 |
|--------|------|--------|
| **TypeScript** | ⬜ 待学 | 大厂标配，必须学 |
| **React 渲染机制** | ⬜ 待学 | 虚拟 DOM、reconciliation |
| **状态管理（Zustand）** | ⬜ 待学 | 比 Redux 简单，更适合你 |
| **React Query** | ⬜ 待学 | 服务端状态、缓存、自动重试 |
| **Next.js** | ⬜ 待学 | React 全栈框架，SSR/SSG |
| **WebSocket** | ⬜ 待学 | 实时通信（聊天、通知） |
| **Redis 缓存** | ⬜ 待学 | 会话存储、热点数据 |
| **单元测试** | ⬜ 待学 | Vitest + Testing Library |
| **RBAC 权限控制** | ⬜ 待学 | 管理员/普通用户不同权限 |
| **Webpack/Vite 原理** | ⬜ 待学 | 面试必问：打包流程 |

---

### 📋 推荐学习顺序（接下来 3 个月）

```
本月（6月）：
  useEffect → useRef → useContext → React Router
    → 用 Context + Router 重构 TodoList

下月（7月）：
  JWT 认证 → bcrypt 加密 → MongoDB Atlas → 后端部署 Render
    → 手机也能完整使用 TodoList

再下月（8月）：
  TypeScript 入门 → 把 TodoList 改成 TS 版本
    → Docker → CI/CD → 写单元测试
```

---

### 🎯 面试前必须准备的 10 道题

1. React 组件之间怎么通信？（props、Context、状态管理）
2. useState 和 useEffect 的原理和常见坑
3. 虚拟 DOM 是什么？diff 算法怎么工作？
4. 受控组件 vs 非受控组件的区别
5. RESTful API 设计规范
6. JWT 认证流程（登录后 token 在哪存、怎么传、过期怎么办）
7. MongoDB 和 MySQL 的区别？什么时候用哪个？
8. 跨域是什么？CORS 怎么解决？
9. Git 工作流：你在团队里怎么用 Git？
10. 从输入 URL 到页面渲染，发生了什么？（必考题！）
