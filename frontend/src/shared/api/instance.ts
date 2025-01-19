import axios from 'axios'

export const instance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.APP_API_URL,
})

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
  return config
})
