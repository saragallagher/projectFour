import axios from 'axios'
import jwt_decode from 'jwt-decode'

axios.defaults.baseURL = 'http://localhost:3001'

const clientAuth = {

  setTokenHeader: () => {
    const token = localStorage.getItem('token')
    if(token) {
      axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token')
    }
  },

  signUp: (userInfo) => {
    return axios({
      url: '/api/users',
      method: 'post',
      data: userInfo
    })
  },

  logIn: (credentials) => {
    return axios({
      url: '/api/users/login',
      method: 'post',
      data: credentials
    })
    .then(res => {
      if(res.data.token) {
        localStorage.setItem('token', res.data.token)
        clientAuth.setTokenHeader()
        return jwt_decode(res.data.token)
      } else {
        return false
      }
    })
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('token')
    return token ? jwt_decode(token) : null
  },

  updateCurrentUser: (currentUser) =>{
    console.log(currentUser)
    return axios({
      url: `api/users/${currentUser}`,
      method: 'patch',
      data: currentUser
    })
    .then(res => {
      console.log(res)
    })
  },

  logOut: () => {
    return new Promise((resolve) => {
      localStorage.clear()
      delete axios.defaults.headers.common['x-access-token']
      resolve("bye.")
    })
  },

  getDrawing: () => {
    return axios({
      url: 'api/drawings',
      method: 'get'
    })
  },

  addDrawing: (newDrawing) => {
    console.log(newDrawing)
    return axios({
      url: '/api/drawings',
      method: 'post',
      data: newDrawing
    })
  },

  deleteDrawing: (id) =>{
    return axios({
      url: `api/drawings/${id}`,
      method: 'delete'
    })
  }
}


clientAuth.setTokenHeader()
export default clientAuth
