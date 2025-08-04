import { useState ,useEffect} from 'react'
import services from './services/countryServices.js'
import CountryPage from './components/CountryPage'
import CountryList from './components/CountryList'

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [current, setCurrent] = useState(null)
  
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
  services.getAll().then(data => {
    setCountries(data)
  })
  },[])


  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )
  const openPage = (country) => {
    setCurrent(country)
  }

  return (
    <div>
      find countries <input value={search} onChange={handleSearch}/>
      <CountryList countriesToShow={countriesToShow} openPage={openPage}/>
      <CountryPage country={current} />
    </div>
  )
}
export default App
