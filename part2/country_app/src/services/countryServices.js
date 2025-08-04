import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'

const getAll = () => {
    const req = axios.get(`${baseUrl}/api/all`)
    return req.then(response => response.data)
}

const getWeather = (lat, lon) => {
    const req = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
    
    return req.then(res => res.data)
}
export default { getAll, getWeather }

