import React from 'react';
import { onTest } from '../services/testService.js';

export default function useTest() {
    const [testText, setTestText] = React.useState('');

    async function handleTest() {
        const text = testText.trim();
        if (!text) return;
        const result = await onTest(text);
        setTestText('');  // 提交后清空输入框
        return result;
    }

    return { testText, setTestText, onTest: handleTest };
}
