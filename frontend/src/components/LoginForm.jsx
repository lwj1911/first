import { useState } from "react"

export default function LoginForm({ username, password, onUsernameChange, onPasswordChange, onLogin, onRegister }) {
  const [showPwd, setShowPwd] = useState(false)

  return (
    <>
      账号：<input type="text" placeholder="手机号或邮箱"
        value={username} onChange={e => onUsernameChange(e.target.value)} />
      <br />
      密码：
      <span className="pwd-wrapper">
        <input type={showPwd ? "text" : "password"} placeholder="密码由数字和字母组成"
          value={password} onChange={e => onPasswordChange(e.target.value)} />
        <span
          className={`pwd-eye${showPwd ? "" : " pwd-eye-off"}`}
          onClick={() => setShowPwd(!showPwd)}
        >👁</span>
      </span>
      <br />
      <button onClick={onLogin}>登录</button>
      <button onClick={onRegister}>注册</button>
      <br />
    </>
  )
}
