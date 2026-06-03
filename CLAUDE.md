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
