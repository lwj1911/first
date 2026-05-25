import TodoItem from './TodoItem.jsx'

export default function TodoList({ items, onToggle, onDelete, onEdit }) {
  return (
    <ul className="todo-list">
      {items.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  )
}
