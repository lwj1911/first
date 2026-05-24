import { useState, useEffect, useRef, useCallback } from 'react'

function Hello() {
    const [text, setText] = useState('hello world')
        useEffect(() => {
            setText('hello react')
        })
    return (
        <div>
            <h1>{text}</h1>
        </div>
    );
}
export default Hello
