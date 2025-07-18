import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(response => response.data)
}

const create = newNumber => {
    const req = axios.post(baseUrl, newNumber)
    return req.then(response => response.data)
}

const deletePerson = id => {
    const req = axios.delete(`${baseUrl}/${id}`)
    return req.then(response => response.data)
}

const update = (id, updatedPerson)  => {
    const req = axios.put(`${baseUrl}/${id}`, updatedPerson)
    return req.then(response => response.data)
}
export default { getAll, create, deletePerson, update }