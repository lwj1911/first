import useTest from '../hooks/useTest.js'

export default function Test() {
    const { text, setText, result, handleTest } = useTest()
    return (
        <div>
            <input
                type="text"
                placeholder="请输入内容"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button onClick={handleTest}>测试</button>
            {result && <p>✅ 提交成功：{result}</p>}        </div>
    )
}