import { useState } from 'react'
import { registerUser, loginUser } from '../services/userService'

export default function useLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [currentUser, setCurrentUser] = useState(null)

  async function login() {
    const usertext = username.trim()
    const passtext = password.trim()
    if (!usertext || !passtext) {
      alert('请输入账号和密码')
      return
    }
    const data = await loginUser(username, password)
    if (data.error) {
      alert(data.error)
    } else {
      setCurrentUser(data.username)
      alert('登录成功')
    }
  }

  async function register() {
    const usertext = username.trim()
    const passtext = password.trim()
    if (!usertext) return
    if (!passtext) return
    const data = await registerUser(username, password)
    if (data.error) {
      alert(data.error)
    } else {
      alert('注册成功')
    }
  }

  function logout() {
    setCurrentUser(null)
  }

  return { username, password, currentUser, setUsername, setPassword, login, register, logout }
}
