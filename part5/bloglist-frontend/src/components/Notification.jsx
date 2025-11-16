const Notification = ( type, message ) => {
  if (message === null) {
    return null
  }
  return (
    <div className={type ? 'success': 'error'}>
      {message}
    </div>
  )
}
export default Notification