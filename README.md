# TodoList

一个全栈 Todo 应用，支持多列表、用户注册登录、筛选搜索等功能。

---

## 功能

- 添加 / 删除 / 编辑待办事项
- 完成状态切换
- 多个 Todo 列表切换
- 关键词搜索
- 筛选（全部 / 已完成 / 未完成）
- 用户注册 & 登录
- 彩蛋（Witch 诅咒、Love 收集）
- Vercel 在线部署

---

## 技术栈

| 层 | 技术 |
|------|------|
| 前端 | React 19、Vite 8、Fetch API |
| 后端 | Node.js、Express 5 |
| 数据库 | MongoDB、Mongoose 9 |
| 部署 | Vercel（前端） |
| 工具 | Git、Apifox |

---

## 项目结构

```
TodoList/
├── frontend/                 ← React + Vite 前端
│   └── src/
│       ├── components/       ← 页面组件
│       ├── hooks/            ← 自定义 Hook（状态逻辑）
│       ├── services/         ← 前端请求封装
│       ├── App.jsx           ← 根组件，统一组装
│       └── main.jsx          ← 入口
│
├── backend/                  ← Express 后端
│   ├── config/               ← 数据库连接配置
│   ├── models/               ← Mongoose 数据模型
│   ├── controllers/          ← 请求处理逻辑
│   ├── routes/               ← 路由定义
│   ├── middleware/            ← 中间件（错误处理等）
│   └── server.js             ← 入口
│
└── vercel.json               ← Vercel 部署配置
```

---

## 启动项目

### 1. 安装依赖

```bash
# 前端
cd frontend
npm install

# 后端
cd backend
npm install
```

### 2. 启动 MongoDB

确保本地已安装并运行 MongoDB，默认连接地址：`mongodb://127.0.0.1:27017/todo_db`

### 3. 启动后端

```bash
cd backend
npm start
```

默认运行在：`http://localhost:3000`

### 4. 启动前端

```bash
cd frontend
npm run dev
```

默认运行在：`http://localhost:5173`

---

## API 接口

```
GET    /api/todos?list={list}  获取指定列表的待办
POST   /api/todos?list={list}  新增待办
PATCH  /api/todos/:id          修改待办
DELETE /api/todos/:id          删除待办
POST   /api/users              注册
POST   /api/users/login        登录
POST   /api/tests              测试
```

响应格式：

```json
{
  "success": true,
  "data": {}
}
```

---

## 前端分层架构

```
App.jsx（组装层：调 Hook，传 props）
   ↓
hooks/（逻辑层：状态、校验、调用 service）
   ↓
services/（请求层：fetch 发请求）
   ↓
后端 API
   ↓
components/（渲染层：接收 props，纯展示）
```

---

## 作者

nana
