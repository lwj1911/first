import { useState, useEffect } from 'react'
import './App.css'
import Hello from './components/Hello.jsx'
import WitchAlert from './components/WitchAlert.jsx'
import LoginForm from './components/LoginForm.jsx'
import TodoSwitcher from './components/TodoSwitcher.jsx'
import TodoInput from './components/TodoInput.jsx'
import TodoFilter from './components/TodoFilter.jsx'
import TodoList from './components/TodoList.jsx'

function App() {
  const [witchDead, setWitchDead] = useState(false)

  function justClickme() {
    alert('你点击了按钮！！')
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

  function saveTodos(newTodos) {
    setTodos(newTodos)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos))
  }

  function loadTodos() {
    const saved = localStorage.getItem(STORAGE_KEY)
    setTodos(saved ? JSON.parse(saved) : [])
  }

  function handleSwitchList(list) {
    setActiveList(list)
    setKeyword('')
    setRenderText('')
  }

  useEffect(() => { loadTodos() }, [activeList])

  let showTodos = [...todos].reverse().filter(t => t.text.includes(keyword))
  if (filter === 'done') showTodos = showTodos.filter(t => t.done)
  else if (filter === 'undone') showTodos = showTodos.filter(t => !t.done)

  function handleFilter(f) {
    setFilter(f)
    localStorage.setItem('filter', f)
  }

  function addTodo() {
    const text = renderText.trim()
    if (!text) return
    const newTodo = { id: crypto.randomUUID(), text, done: false, createTime: new Date().toISOString() }
    saveTodos([...todos, newTodo])
    setKeyword('')
    setRenderText('')
  }

  function deleteTodo(id) {
    saveTodos(todos.filter(t => t.id !== id))
  }

  function toggleDone(id, done) {
    saveTodos(todos.map(t => t.id === id ? { ...t, done } : t))
  }

  function editTodo(id, oldText) {
    const newText = prompt('请输入新的内容', oldText)
    if (!newText) return
    saveTodos(todos.map(t => t.id === id ? { ...t, text: newText } : t))
  }

  function handleInputChange(e) {
    setRenderText(e.target.value)
    setKeyword(e.target.value.trim())
  }

  // ====== JSX ======
  return (
    <div className={witchDead ? 'witch-curse' : ''}>
      <h1>我的TodosList</h1>

      <button onClick={justClickme}>Click me!</button>

      <WitchAlert onWitchDeadChange={setWitchDead} />

      <a href="https://www.baidu.com">look me</a>
      <br />

      <LoginForm />

      <TodoSwitcher activeList={activeList} onSwitch={handleSwitchList} />

      <TodoInput value={renderText} onChange={handleInputChange} onAdd={addTodo} />
      <TodoFilter current={filter} onChange={handleFilter} />
      <br />

      <TodoList
        items={showTodos}
        onToggle={toggleDone}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />

      <Hello />
    </div>
  )
}

export default App
