import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

// GET
const getAll = () => {
    const request = axios.get(`${baseUrl}all`)
    return request.then(response => response.data)
}

// GET
const getCountry = (name) => {
    const request = axios.get(`${baseUrl}${name}`)
    return request.then(response => response.data)
}

export default {getAll, getCountry}