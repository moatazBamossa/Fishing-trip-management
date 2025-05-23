import axios from 'axios'

const token = localStorage.getItem('token')
const token2 = localStorage.getItem('auth-storage')
const token3 = localStorage.getItem('secureUserData')
console.log('token', token)
console.log('token2', token2)
console.log('token3', token3)
const api = axios.create({
  baseURL: 'https://fishing-trip-management-system.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token') ?? '',
  },
})

export default api
