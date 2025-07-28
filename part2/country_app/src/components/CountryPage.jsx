import { useState ,useEffect} from 'react'
import services from '../services/countryServices'

const CountryPage = ({ country}) => {
  const [weatherdata, setWeatherdata] = useState(null);
  useEffect(() => {
    if (country) {
      services
        .getWeather(country.latlng[0].toString(), country.latlng[1].toString())
        .then(data => setWeatherdata(data));
    }
  }, [country]);
  if (!weatherdata) {
    return <p>Loading country and weather data...</p>;
  }

  
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>{country.capital}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      <container><img src={country.flags.png} alt={country.flags.alt}/></container>
      <h2>Weather in {country.name.common}</h2>
      <p>temperature {(weatherdata.main.temp - 273.15).toFixed(2)} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${weatherdata.weather[0].icon}@2x.png`}/>
      <p>wind {(weatherdata.wind.speed).toFixed(1)} m/s</p>
    </div>
  )

}

export default CountryPage