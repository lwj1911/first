import { useState, useRef } from 'react'

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
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

        <button onClick={() => onEdit(todo.id, todo.text)}>编辑</button>

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
