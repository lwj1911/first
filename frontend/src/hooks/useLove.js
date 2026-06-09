import { useState } from 'react'

export default function useLove() {
    const [showAlert, setShowAlert] = useState(false)
    const [alertMsg, setAlertMsg] = useState('')

    const onLoveChange = () => {
        setAlertMsg('月色真美')
        setShowAlert(true)
    }

    const closeLoveAlert = () => {
        
        setShowAlert(false)
    }

    return { onLoveChange, showAlert, alertMsg, closeLoveAlert }
}
