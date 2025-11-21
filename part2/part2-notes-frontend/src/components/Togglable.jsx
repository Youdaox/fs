import { useState, useImperativeHandle, forwardRef } from 'react'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none': '' }
  const showWhenVisible = { display: visible ? '': 'none' }

  const toggle = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return { toggle }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggle}> {props.buttonText}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggle}>cancel</button>
      </div>
    </div>
  )
})
export default Togglable