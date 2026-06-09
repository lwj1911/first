import { useNavigate } from 'react-router-dom'
import '../App.css'
import './MainPage.css'
import useTodos from '../hooks/useTodos.js'
import useWitch from '../hooks/useWitch.js'
import { logoutUser } from '../services/userService.js'

import WitchAlert from '../components/WitchAlert.jsx'
import LoveAlert from '../components/LoveAlert.jsx'
import TodoSwitcher from '../components/TodoSwitcher.jsx'
import TodoFilter from '../components/TodoFilter.jsx'
import TodoList from '../components/TodoList.jsx'

export default function MainPage() {
  const todo = useTodos()
  const witch = useWitch()
  const navigate = useNavigate()

  return (
    <div className={`main-page ${witch.witchDead ? 'witch-curse' : ''}`}>
      {/* ====== 顶部 ====== */}
      <header className="main-header">
        <h1>📝 我的 Todos</h1>
        <button className="btn-logout" onClick={async () => {
            await logoutUser()
            localStorage.removeItem('currentUser')
            navigate('/')
          }}>退出登录</button>
      </header>

      {/* ====== 输入区 ====== */}
      <div className="todo-input-area">
        <input
          type="text"
          placeholder="添加新的待办事项..."
          value={todo.renderText}
          onChange={todo.handleInputChange}
          onKeyDown={e => e.key === 'Enter' && todo.addTodo()}
        />
        <button onClick={todo.addTodo}>添加</button>
      </div>

      {/* ====== 工具栏 ====== */}
      <div className="todo-toolbar">
        <TodoSwitcher activeList={todo.activeList} onSwitch={todo.switchList} />
        <TodoFilter current={todo.filter} onChange={todo.changeFilter} />
      </div>

      {/* ====== 列表 ====== */}
      <div className="todo-list-section">
        {todo.showTodos.length === 0 ? (
          <div className="todo-empty">
            <span>📭</span>
            暂无待办事项，快去添加吧！
          </div>
        ) : (
          <TodoList
            items={todo.showTodos}
            onToggle={todo.toggleDone}
            onDelete={todo.deleteTodo}
            onEdit={todo.editTodo}
          />
        )}
      </div>

      {/* ====== 页脚彩蛋 ====== */}
      <footer className="main-footer">
        <WitchAlert
          witchText={witch.witchText}
          witchDead={witch.witchDead}
          showAlert={witch.showAlert}
          alertMsg={witch.alertMsg}
          btText={witch.btText}
          onWitch={witch.onWitch}
          closeAlert={witch.closeAlert}
          witchForgive={witch.witchForgive}
        />
        <LoveAlert />
      </footer>
    </div>
  )
}
