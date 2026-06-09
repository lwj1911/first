const BASE= "http://localhost:3000/api";

export async function testService(text) {
    const res = await fetch(`${BASE}/test`,{    
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({text})
    })
    const json = await res.json()
    return json.data || {}
}