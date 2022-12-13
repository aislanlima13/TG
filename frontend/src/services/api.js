import axios from 'axios';

const api = axios.create({
    baseURL: 'https://bakendtg.herokuapp.com',
})

export default api;