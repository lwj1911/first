// 后端统一 API 前缀
const BASE = "http://localhost:3000/api";

// 注册
export async function registerUser(username, password) {
    const res = await fetch(`${BASE}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    return res.json();
}

// 登录
export async function loginUser(username, password) {
    const res = await fetch(`${BASE}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    return res.json();
}
