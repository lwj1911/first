import { useState } from 'react'
import { testService } from '../services/testService.js'

export default function useTest() {
    const [text, setText] = useState('')
    const [result, setResult] = useState(null)

    const handleTest = async () => {
        if (!text.trim()) return
        const data = await testService(text)
        setResult(data.text)
        setText('')
    }

    return { text, setText, result, handleTest }
}