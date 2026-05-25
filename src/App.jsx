import { useState, useEffect, useRef } from 'react'
import './App.css'
import Hello from './Hello.jsx'

function App() {
  // ====== witch 弹窗系统 ======
  const [alertMsg, setAlertMsg] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [btText, setBtText] = useState('确定')
  const [witchText, setWitchText] = useState('witch')
  const [hasRepented, setHasRepented] = useState(false)
  const [witchDead, setWitchDead] = useState(false)
  const countRef = useRef(0)

  function justClickme() {
    setAlertMsg('你点击了按钮！！')
    setShowAlert(true)
  }

  function onWitch() {
    const count = countRef.current
    switch (count) {
      case 0:
        setAlertMsg('你惊扰了witch！！给你第一次机会')
        break
      case 1:
        setAlertMsg('你又惊扰了witch！！给你第二次机会')
        break
      case 2:
        setAlertMsg('你又又惊扰了witch！！给你最后一次机会')
        break
      default:
        setAlertMsg('你已经惊扰了witch三次了！！没有机会了')
        setWitchDead(true)
        break
    }
    countRef.current++
    setShowAlert(true)
    setBtText('我错了')
    setWitchText('你惊扰了witch！！')
    setHasRepented(true)
  }

  function closeAlert() {
    if (hasRepented) {
      setWitchText('witch原谅了你！！')
    }
    setShowAlert(false)
  }
  function witchForgive() {
    setWitchDead(false)
    setWitchText('witch')
    setAlertMsg('witch回来了，你又有三次机会了！！')
    countRef.current = 0
    setHasRepented(false)
  }

  // ====== 登录 ======
  const [username, setUsername] = useState(() => localStorage.getItem('username') || '')
  const [password, setPassword] = useState('')

  function login() {
    localStorage.setItem('username', username)
    alert(`你输入的账号是: ${username}，密码是: ${password}`)
  }

  // ====== Todo 数据 ======
  const [activeList, setActiveList] = useState('todolist1')
  const STORAGE_KEY = `todos_${activeList}`
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  })
  const [renderText, setRenderText] = useState('')
  const [filter, setFilter] = useState(() => localStorage.getItem('filter') || 'all')
  const [keyword, setKeyword] = useState('')

  // ---------- localStorage 版本 ----------
  function saveTodos(newTodos) {
    setTodos(newTodos)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos))
  }

  function loadTodos() {
    const saved = localStorage.getItem(STORAGE_KEY)
    setTodos(saved ? JSON.parse(saved) : [])
  }

  // const fetchTodos = useCallback(() => {
  //   fetch(API)
  //     .then(res => res.json())
  //     .then(setTodos)
  //     .catch(err => console.error('获取数据失败:', err))
  // }, [API])

  function handleSwitchList(list) {
    setActiveList(list)
    setKeyword('')
    setRenderText('')
  }

  useEffect(() => { loadTodos() }, [activeList])

  // 筛选 + 搜索
  let showTodos = [...todos].reverse().filter(t => t.text.includes(keyword))
  if (filter === 'done') showTodos = showTodos.filter(t => t.done)
  else if (filter === 'undone') showTodos = showTodos.filter(t => !t.done)

  function handleFilter(f) {
    setFilter(f)
    localStorage.setItem('filter', f)
  }

  // 添加
  function addTodo() {
    const text = renderText.trim()
    if (!text) return
    const newTodo = { id: crypto.randomUUID(), text, done: false, createTime: new Date().toISOString() }
    saveTodos([...todos, newTodo])
    setKeyword('')
    setRenderText('')
  }
  // async function addTodo() {
  //   const text = renderText.trim()
  //   if (!text) return
  //   try {
  //     await fetch(API, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ text, done:false, createTime:new Date() }) })
  //     setKeyword(''); setRenderText(''); fetchTodos()
  //   } catch(err) { console.error('添加失败:', err) }
  // }

  // 删除
  function deleteTodo(id) {
    saveTodos(todos.filter(t => t.id !== id))
  }
  // async function deleteTodo(id) {
  //   try { await fetch(`${API}/${id}`, { method:'DELETE' }); fetchTodos() }
  //   catch(err) { console.error('删除失败:', err) }
  // }

  // 切换完成
  function toggleDone(id, done) {
    saveTodos(todos.map(t => t.id === id ? { ...t, done } : t))
  }
  // async function toggleDone(id, done) {
  //   try { await fetch(`${API}/${id}`, { method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ done }) }); fetchTodos() }
  //   catch(err) { console.error('更新失败:', err) }
  // }

  // 编辑
  function editTodo(id, oldText) {
    const newText = prompt('请输入新的内容', oldText)
    if (!newText) return
    saveTodos(todos.map(t => t.id === id ? { ...t, text: newText } : t))
  }
  // async function editTodo(id, oldText) {
  //   const newText = prompt('请输入新的内容', oldText)
  //   if (!newText) return
  //   try { await fetch(`${API}/${id}`, { method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ text:newText }) }); fetchTodos() }
  //   catch(err) { console.error('编辑失败:', err) }
  // }

  // ====== JSX ======
  return (
    <div className={witchDead ? 'witch-curse' : ''}>
      <h1>我的TodosList</h1>
      
      <button onClick={justClickme}>Click me!</button>

      {/* witch 按钮 */}

    <div style={{marginTop:'16px'}}>
        {!witchDead && (
          <span className="witch-text" onClick={onWitch}>
            {witchText}
          </span>
        )}
        <button onClick={witchForgive} style={{ marginLeft: '8px' }}>让witch原谅你</button>
      </div>

      {/* 自定义弹窗 */}
      {showAlert && (
        <div className="alert-overlay display-block">
          <p>{alertMsg}</p>
          <button onClick={closeAlert}>{btText}</button>
        </div>
      )}

      <a href="https://www.baidu.com">look me</a>
      <br />

      {/* 登录区域 */}
      账号：<input type="text" placeholder="手机号或邮箱"
        value={username} onChange={e => setUsername(e.target.value)} />
      <br />
      密码：<input type="password" placeholder="密码由数字和字母组成"
        value={password} onChange={e => setPassword(e.target.value)} /><br />
      <button onClick={login}>登录</button>
      <br />


      {/* 下拉菜单 */}
      <div className="dropdown">
        <ul className="dropdown-menu">
          <li onClick={() => handleSwitchList('todolist1')}
            style={{ background: activeList === 'todolist1' ? '#d0d0d0' : undefined }}>
            清单1
          </li>
          <li onClick={() => handleSwitchList('todolist2')}
            style={{ background: activeList === 'todolist2' ? '#d0d0d0' : undefined }}>
            清单2
          </li>
          <li onClick={() => handleSwitchList('todolist3')}
            style={{ background: activeList === 'todolist3' ? '#d0d0d0' : undefined }}>
            清单3
          </li>
        </ul>
      </div>

      {/* 列表2：render 方式 + 筛选 + 搜索 */}
      <input type="text" placeholder="请输入要添加和输入的信息"
        value={renderText}
        onChange={e => {
          setRenderText(e.target.value)
          setKeyword(e.target.value.trim())
        }}
        onKeyDown={e => { if (e.key === 'Enter') addTodo() }}
      />
      <button onClick={addTodo}>使用render来添加</button>
      <button onClick={() => handleFilter('all')}>全部</button>
      <button onClick={() => handleFilter('done')}>已完成</button>
      <button onClick={() => handleFilter('undone')}>未完成</button>
      <br />

      <ul className="todo-list">
        {showTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleDone}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        ))}
      </ul>
      <Hello />
    </div>
  )
}

// ====== 单个 Todo 项组件 ======
function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [deleting, setDeleting] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const liRef = useRef(null)

  function handleDelete() {
    setDeleting(true)
    setTimeout(() => onDelete(todo.id), 300)
  }

  return (
    <li
      ref={liRef}
      className={`todo-item ${deleting ? 'todo-deleting' : 'todo-enter'}`}
    >
      <span
        className={todo.done ? 'todo-done' : ''}
        style={{ cursor: 'pointer' }}
      >
        {todo.text}
      </span>

      <span className="todo-actions">
        <button onClick={handleDelete}>删除</button>

        {/* 详细 */}
        <span
          className="details-wrapper"
          onMouseEnter={() => setShowDetails(true)}
          onMouseLeave={() => setShowDetails(false)}
        >
          <button>详细</button>
          {showDetails && (
            <div className="details-popup">
              创建时间: {new Date(todo.createTime).toLocaleString()}，状态: {todo.done ? '已完成' : '未完成'}
            </div>
          )}
        </span>

        {/* 编辑 */}
        <button onClick={() => onEdit(todo.id, todo.text)}>编辑</button>

        {/* 完成复选框 */}
        <input
          type="checkbox"
          checked={todo.done}
          onChange={e => onToggle(todo.id, e.target.checked)}
        />
        <span className="done-label">{todo.done ? '已完成' : '未完成'}</span>
      </span>
      </li>
  )
}

export default App
