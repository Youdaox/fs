import { useSelector } from "react-redux"

const Notification = () => {
  const message = useSelector(state => state.notification)

  const style = {
    display: message === '' ? 'none' : '',
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  return <div style={style}>{message}</div>
}

export default Notification
