import { useState, useRef, useCallback } from 'react'

export default function useWitch() {
  const [witchText, setWitchText] = useState('witch')  //witch的文本 初始为witch
  const [hasRepented, setHasRepented] = useState(false)//检测是否已经忏悔过了，初始为false
  const [alertMsg, setAlertMsg] = useState('')         //alert弹窗的文本 初始为''
  const [showAlert, setShowAlert] = useState(false)    //是否显示alert弹窗 初始为false
  const [btText, setBtText] = useState('我错了')       //弹窗里面的按钮文本 初始为'我错了'
  const [witchDead, setWitchDead] = useState(false)   //witch是否死亡 初始为false
  const countRef = useRef(0)                          //计数器，记录惊扰witch的次数 初始为0

  const onWitch = useCallback(() => {
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
        break
    }
    countRef.current++
    setShowAlert(true)
    setWitchText('你惊扰了witch！！')
    setHasRepented(true)
  }, [])

  const closeAlert = useCallback(() => {
    if (hasRepented) {
      setWitchText('witch原谅了你！！')
    }
    setShowAlert(false)
  }, [hasRepented])

  const witchForgive = useCallback(() => {
    setWitchDead(false)
    setWitchText('witch')
    setAlertMsg('witch回来了，你又有三次机会了！！')
    countRef.current = 0
    setHasRepented(false)
  }, [])

  return {
    witchText,
    witchDead,
    showAlert,
    alertMsg,
    btText,
    onWitch,
    closeAlert,
    witchForgive,
  }
}
