export default function WitchAlert({
  witchText,
  witchDead,
  showAlert,
  alertMsg,
  btText,
  onWitch,
  closeAlert,
  witchForgive,
}) {
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
