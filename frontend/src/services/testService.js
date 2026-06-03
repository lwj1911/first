const BASE = "http://localhost:3000/api";

export async function onTest(testText) {
    const res = await fetch(`${BASE}/test`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testText }),
    });
    const json = await res.json();
    return json;
}