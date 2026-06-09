import { useState, useEffect } from 'react'
import { fetchTodos, createTodo, deleteTodo, updateTodo } from '../services/todoService'

export default function useTodos() {
  const [activeList, setActiveList] = useState('todolist1')
  const [todos, setTodos] = useState([])
  const [renderText, setRenderText] = useState('')
  const [filter, setFilter] = useState('all')
  const [keyword, setKeyword] = useState('')

  // 从后端加载当前列表的todos
  async function loadTodos() {
    const data = await fetchTodos(activeList)
    setTodos(data)
  }

  // 切换列表，清空搜索和输入
  function switchList(list) {
    setActiveList(list)
    setKeyword('')
    setRenderText('')
  }
useEffect(() => { loadTodos() }, [activeList])


  let showTodos = todos.filter(t => t.text.includes(keyword))
  if (filter === 'done') showTodos = showTodos.filter(t => t.done)
  else if (filter === 'undone') showTodos = showTodos.filter(t => !t.done)

  // 切换筛选条件（全部/已完成/未完成）
  function changeFilter(f) {
    setFilter(f)
  }

  // 新增todo到当前列表
  async function addTodo() {
    const text = renderText.trim()
    if (!text) return
    await createTodo(text, activeList)
    await loadTodos()
    setKeyword('')
    setRenderText('')
  }

  // 根据id删除todo
  async function handleDeleteTodo(id) {
    await deleteTodo(id, activeList)
    await loadTodos()
  }

  async function toggleDone(id, done) {
    await updateTodo(id, { done }, activeList)
    await loadTodos()
  }

  async function editTodo(id, oldText) {
    const newText = prompt('请输入新的内容', oldText)
    if (!newText) return
    await updateTodo(id, { text: newText }, activeList)
    await loadTodos()
  }

  function handleInputChange(e) {
    setRenderText(e.target.value)
    setKeyword(e.target.value.trim())
  }

  return {
    activeList,
    renderText,
    filter,
    showTodos,
    switchList,
    changeFilter,
    addTodo,
    deleteTodo: handleDeleteTodo,
    toggleDone,
    editTodo,
    handleInputChange,
  }
}
