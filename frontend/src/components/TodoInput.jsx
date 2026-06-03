export default function TodoInput({ value, onChange, onAdd }) {
  return (
    <>
      <input type="text" placeholder="请输入要添加和输入的信息"
        value={value}
        onChange={onChange}
        onKeyDown={e => { if (e.key === 'Enter') onAdd() }}
      />
      <button onClick={onAdd}>使用render来添加</button>
    </>
  )
}
