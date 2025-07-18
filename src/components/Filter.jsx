const Filter = (props) => {

  return (
  <div>
    filter shown with <input value={props.search} onChange={props.onChange} />
  </div>
  )
}

export default Filter