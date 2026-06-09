import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useLogin from '../hooks/useLogin.js'
import { tryRefresh } from '../services/userService.js'
import './LoginPage.css'

export default function LoginPage() {
  const { username, password, currentUser, setUsername, setPassword, login, register } = useLogin()
  const [checking, setChecking] = useState(true)
  const navigate = useNavigate()

  // 页面打开时：尝试用 cookie 里的 RT 换 AT（静默恢复登录）
  useEffect(() => {
    if (currentUser) {
      // 已有 currentUser（可能是 localStorage 恢复的），直接尝试刷新 AT
      tryRefresh().then(ok => {
        if (ok) {
          navigate('/main')
        } else {
          localStorage.removeItem('currentUser')
          window.location.reload()
        }
        setChecking(false)
      })
    } else {
      setChecking(false)
    }
  }, [])

  // 登录成功后跳转
  useEffect(() => {
    if (!checking && currentUser) {
      navigate('/main')
    }
  }, [currentUser, checking, navigate])

  if (checking) {
    return (
      <div className="login-page">
        <div className="login-card">
          <p>正在验证登录状态...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>📝 TodoList</h1>
        <p className="login-subtitle">请登录以管理你的待办事项</p>

        <input
          type="text"
          placeholder="手机号或邮箱"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="密码（8-16位字母和数字）"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <div className="login-buttons">
          <button className="btn-login" onClick={login}>登录</button>
          <button className="btn-register" onClick={register}>注册</button>
        </div>
      </div>
    </div>
  )
}
