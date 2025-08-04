const CountryList = ({ countriesToShow, openPage}) => {
  const countries = countriesToShow
  if (countries.length > 10) {
    return <p> Too many matches, specify another filter</p>
  } else if (countries.length > 1){
    return (
      countries.map(country => 
        <p>{country.name.common} <button onClick={() => openPage(country)}>open</button></p>
      )
    )
  } else if (countries.length == 1){
      openPage(countries[0])
  }
}

export default CountryList