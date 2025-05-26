import axios from 'axios'

const api = axios.create({
  baseURL: 'https://fishing-trip-management-system.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token') ?? '',
  },
})

export default api
