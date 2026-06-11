import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useLogin from '../hooks/useLogin.js'
import './LoginPage.css'

export default function LoginPage() {
  const { username, password, currentUser, setUsername, setPassword, login, register } = useLogin()
  const navigate = useNavigate()

  // 如果已有 currentUser（localStorage 里有），直接跳主页
  useEffect(() => {
    if (localStorage.getItem('currentUser') && localStorage.getItem('accessToken')) {
      navigate('/main', { replace: true })
    }
  }, [navigate])

  // 登录成功后跳转
  useEffect(() => {
    if (currentUser) {
      navigate('/main', { replace: true })
    }
  }, [currentUser, navigate])

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
