import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

// GET
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

// POST
const createNew = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

// PUT
const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

// DELETE
const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    const responseData = request.then(response => response.data)
    console.log(responseData)
    return responseData

}

export default {getAll, createNew, update, deletePerson}