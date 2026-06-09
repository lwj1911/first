import { useState, useRef, useEffect } from "react"
import useLove from "../hooks/useLove.js"

export default function LoveAlert() {
    const { showAlert, alertMsg, onLoveChange, closeLoveAlert } = useLove()
    const [btnPos, setBtnPos] = useState(null)
    const btnRef = useRef(null)

    // 每次弹窗打开时，重置按钮位置
    useEffect(() => {
        if (showAlert) {
            setBtnPos(null)
        }
    }, [showAlert])

    const escape = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const angle = Math.random() * Math.PI * 2
        const nx = Math.max(0, Math.min(rect.left + Math.cos(angle) * 100, window.innerWidth - rect.width))
        const ny = Math.max(0, Math.min(rect.top + Math.sin(angle) * 100, window.innerHeight - rect.height))
        setBtnPos({ left: nx, top: ny })
    }

    return (
        <>
            <button onClick={onLoveChange}>月色真美（点我）</button>
            {showAlert && (
                <>
                    <div className="alert-overlay display-block">
                        <p>{alertMsg}</p>
                        <button onClick={closeLoveAlert}>真美</button>
                        {!btnPos && (
                            <button ref={btnRef} onMouseEnter={escape}>不美</button>
                        )}
                    </div>
                    {btnPos && (
                        <button
                            ref={btnRef}
                            onMouseEnter={escape}
                            style={{
                                position: "fixed",
                                left: btnPos.left,
                                top: btnPos.top,
                                transition: "left 0.15s, top 0.15s",
                                zIndex: 9999,
                            }}
                        >不美</button>
                    )}
                </>
            )}
        </>
    )
}
