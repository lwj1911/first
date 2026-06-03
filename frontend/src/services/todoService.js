const BASE = "http://localhost:3000/api";

// 获取指定列表的所有todos
export async function fetchTodos(list) {
    const res = await fetch(`${BASE}/todos?list=${list}`);
    const json = await res.json();
    return json.data || [];
}

// 新增todo
export async function createTodo(text, list) {
    await fetch(`${BASE}/todos?list=${list}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
    });
}

// 删除todo
export async function deleteTodo(id, list) {
    await fetch(`${BASE}/todos/${id}?list=${list}`, { method: "DELETE" });
}

// 修改todo
export async function updateTodo(id, data, list) {
    await fetch(`${BASE}/todos/${id}?list=${list}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
}
