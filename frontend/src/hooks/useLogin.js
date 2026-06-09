import { useState } from 'react'
import { registerUser, loginUser, logoutUser } from '../services/userService.js'

export default function useLogin() {
  // 页面加载时检查 RT：有 RT 就尝试恢复登录状态
  const savedUser = localStorage.getItem("currentUser")
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [currentUser, setCurrentUser] = useState(savedUser)

  async function login() {
    const usertext = username.trim()
    const passtext = password.trim()
    if (!usertext || !passtext) {
      alert('请输入账号和密码')
      return
    }
    const res = await loginUser(username, password)
    if (!res.success) {
      alert(res.message)
    } else {
      setCurrentUser(res.data.username)
      localStorage.setItem("currentUser", res.data.username)
    }
  }

  async function register() {
    const usertext = username.trim()
    const passtext = password.trim()
    if (!usertext) return
    if (!passtext) return
    const res = await registerUser(username, password)
    if (!res.success) {
      alert(res.message)
    } else {
      alert('注册成功')
    }
  }

  async function logout() {
    await logoutUser()
    setCurrentUser(null)
    localStorage.removeItem("currentUser")
  }

  return { username, password, currentUser, setUsername, setPassword, login, register, logout }
}
