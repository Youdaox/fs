import { useState, useImperativeHandle } from 'react'

const Togglable = (props) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none': '' }
    const showWhenVisible = { display: visible ? '': 'none' }

    const toggle = () => {
      setVisible(!visible)
    }

    useImperativeHandle(props.ref, () => {
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
}
export default Togglable