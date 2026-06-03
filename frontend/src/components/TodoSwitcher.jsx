const LISTS = [
  { key: 'todolist1', label: '清单1' },
  { key: 'todolist2', label: '清单2' },
  { key: 'todolist3', label: '清单3' },
]

export default function TodoSwitcher({ activeList, onSwitch }) {
  return (
    <div className="dropdown">
      <ul className="dropdown-menu">
        {LISTS.map(list => (
          <li
            key={list.key}
            onClick={() => onSwitch(list.key)}
            style={{ background: activeList === list.key ? '#d0d0d0' : undefined }}
          >
            {list.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
