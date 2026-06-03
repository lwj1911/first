import React from 'react'

export default function Test({ testText, setTestText, onTest }) {
    return (
       <>   
        <input
            type="text"
            placeholder="请输入内容"
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
        />
        <button onClick={() => onTest(testText)}>提交</button>
        </>   
    )
}