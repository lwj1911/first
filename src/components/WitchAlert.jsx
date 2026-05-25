import { useState, useRef } from 'react'

export default function WitchAlert({ onWitchDeadChange }) {
  const [witchText, setWitchText] = useState('witch')
  const [hasRepented, setHasRepented] = useState(false)
  const [alertMsg, setAlertMsg] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [btText, setBtText] = useState('确定')
  const [witchDead, setWitchDead] = useState(false)
  const countRef = useRef(0)

  function onWitch() {
    const count = countRef.current
    switch (count) {
      case 0:
        setAlertMsg('你惊扰了witch！！给你第一次机会')
        break
      case 1:
        setAlertMsg('你又惊扰了witch！！给你第二次机会')
        break
      case 2:
        setAlertMsg('你又又惊扰了witch！！给你最后一次机会')
        break
      default:
        setAlertMsg('你已经惊扰了witch三次了！！没有机会了')
        setWitchDead(true)
        onWitchDeadChange(true)
        break
    }
    countRef.current++
    setShowAlert(true)
    setBtText('我错了')
    setWitchText('你惊扰了witch！！')
    setHasRepented(true)
  }

  function closeAlert() {
    if (hasRepented) {
      setWitchText('witch原谅了你！！')
    }
    setShowAlert(false)
  }

  function witchForgive() {
    setWitchDead(false)
    onWitchDeadChange(false)
    setWitchText('witch')
    setAlertMsg('witch回来了，你又有三次机会了！！')
    countRef.current = 0
    setHasRepented(false)
  }

  return (
    <>
      <div style={{ marginTop: '16px' }}>
        {!witchDead && (
          <span className="witch-text" onClick={onWitch}>
            {witchText}
          </span>
        )}
        <button onClick={witchForgive} style={{ marginLeft: '8px' }}>让witch原谅你</button>
      </div>

      {showAlert && (
        <div className="alert-overlay display-block">
          <p>{alertMsg}</p>
          <button onClick={closeAlert}>{btText}</button>
        </div>
      )}
    </>
  )
}
