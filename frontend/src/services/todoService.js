import { authFetch } from "./userService.js";

// 获取指定列表的所有todos
export async function fetchTodos(list) {
    const res = await authFetch(`/todos?list=${list}`);
    const json = await res.json();
    return json.data || [];
}

// 新增todo
export async function createTodo(text, list) {
    await authFetch(`/todos?list=${list}`, {
        method: "POST",
        body: JSON.stringify({ text }),
    });
}

// 删除todo
export async function deleteTodo(id, list) {
    await authFetch(`/todos/${id}?list=${list}`, {
        method: "DELETE",
    });
}

// 修改todo
export async function updateTodo(id, data, list) {
    await authFetch(`/todos/${id}?list=${list}`, {
        method: "PATCH",
        body: JSON.stringify(data),
    });
}
