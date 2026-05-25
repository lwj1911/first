const FILTERS = [
  { key: 'all', label: '全部' },
  { key: 'done', label: '已完成' },
  { key: 'undone', label: '未完成' },
]

export default function TodoFilter({ current, onChange }) {
  return (
    <>
      {FILTERS.map(f => (
        <button key={f.key} onClick={() => onChange(f.key)}>{f.label}</button>
      ))}
    </>
  )
}
