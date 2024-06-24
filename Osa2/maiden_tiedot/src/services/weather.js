import axios from 'axios'
const api_key = import.meta.env.VITE_WEATHER_KEY
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q='

// GET
const getCurrentWeather = (city) =>{
    const request = axios.get(`${baseUrl}${city}&appid=${api_key}`)
    console.log(request.then(response => response.data))
    return request.then(response => response.data)
}

export default {getCurrentWeather}