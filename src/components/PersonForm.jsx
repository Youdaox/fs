const PersonForm = (props) => {
    return (
      <form>
        <div>
          name: <input value={props.newName} onChange={props.handleChange}/>
        </div>
        <div>
          number: <input value={props.phoneNumber} onChange={props.handlePhoneNumber}/></div>
        <div>
          <button type="submit" onClick={props.handleClick}>add</button>
        </div>
      </form>
    )
}

export default PersonForm