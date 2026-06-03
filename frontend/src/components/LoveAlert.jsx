import { useState, useRef } from "react"

export default function LoveAlert({ showAlert, alertMsg, onClose }) {
    const [btnPos, setBtnPos] = useState(null)
    const btnRef = useRef(null)

    const escape = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const angle = Math.random() * Math.PI * 2
        const nx = Math.max(0, Math.min(rect.left + Math.cos(angle) * 100, window.innerWidth - rect.width))
        const ny = Math.max(0, Math.min(rect.top + Math.sin(angle) * 100, window.innerHeight - rect.height))
        setBtnPos({ left: nx, top: ny })
    }

    return (
        <>
            {showAlert && (
                <>
                    <div className="alert-overlay display-block">
                        <p>{alertMsg}</p>
                        <button onClick={onClose}>真美</button>
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
