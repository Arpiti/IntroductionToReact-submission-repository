import axios from "axios";

const baseUrl = 'https://phonebook-app-arpit.herokuapp.com/api/persons';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then( response => response.data);
} 

const create = (person) => {
    const request = axios.post(baseUrl, person);
    return request.then( response => response.data);
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    console.log('Deleted');
    return request.then( response => response.data);
} 

const update = (id, newPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, newPerson);
    return request.then( response => response.data);
} 

export default { getAll, create, remove, update };