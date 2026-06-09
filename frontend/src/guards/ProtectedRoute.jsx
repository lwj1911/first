import { Navigate } from 'react-router-dom'

// 路由守卫：没有 token → 重定向到登录页
export default function ProtectedRoute({ children }) {
    const at = localStorage.getItem('accessToken')
    if (!at) {
        return <Navigate to="/" replace />
    }
    return children
}
