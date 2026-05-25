import { useState } from 'react'

export default function LoginForm() {
  const [username, setUsername] = useState(() => localStorage.getItem('username') || '')
  const [password, setPassword] = useState('')

  function login() {
    localStorage.setItem('username', username)
    alert(`你输入的账号是: ${username}，密码是: ${password}`)
  }

  return (
    <>
      账号：<input type="text" placeholder="手机号或邮箱"
        value={username} onChange={e => setUsername(e.target.value)} />
      <br />
      密码：<input type="password" placeholder="密码由数字和字母组成"
        value={password} onChange={e => setPassword(e.target.value)} /><br />
      <button onClick={login}>登录</button>
      <br />
    </>
  )
}
