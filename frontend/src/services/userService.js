const BASE = "https://first-fafk.onrender.com/api";

// AT 存 localStorage（刷新不丢），RT 在 httpOnly cookie 里
function getAccessToken() { return localStorage.getItem("accessToken"); }
function setAccessToken(t) { localStorage.setItem("accessToken", t); }
export function clearTokens() { localStorage.removeItem("accessToken"); }

export async function registerUser(username, password) {
    const res = await fetch(`${BASE}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
    });
    return res.json();
}

export async function loginUser(username, password) {
    const res = await fetch(`${BASE}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
    });
    const json = await res.json();
    if (json.success && json.data.accessToken) {
        setAccessToken(json.data.accessToken);
    }
    return json;
}

let refreshPromise = null;
export async function tryRefresh() {
    if (refreshPromise) { await refreshPromise; return !!getAccessToken(); }
    refreshPromise = (async () => {
        try {
            const res = await fetch(`${BASE}/users/refresh`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });
            const json = await res.json();
            if (json.success) setAccessToken(json.data.accessToken);
            else clearTokens();
        } catch { clearTokens(); }
        finally { refreshPromise = null; }
    })();
    await refreshPromise;
    return !!getAccessToken();
}

export async function logoutUser() {
    await fetch(`${BASE}/users/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });
    clearTokens();
}

export async function authFetch(url, options = {}) {
    const makeHeaders = () => {
        const h = { "Content-Type": "application/json", ...options.headers };
        const at = getAccessToken();
        if (at) h["Authorization"] = `Bearer ${at}`;
        return h;
    };
    let res = await fetch(`${BASE}${url}`, { ...options, headers: makeHeaders(), credentials: "include" });
    if (res.status === 401) {
        const ok = await tryRefresh();
        if (ok) res = await fetch(`${BASE}${url}`, { ...options, headers: makeHeaders(), credentials: "include" });
    }
    return res;
}
