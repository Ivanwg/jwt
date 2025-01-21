import { ApiInstance } from '@/shared/api'

export const defaultApiInstance = new ApiInstance().instance
export const bearerApiInstance = new ApiInstance().instance

bearerApiInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
  return config
})

bearerApiInstance.interceptors.response.use((config) => {
  console.log(config)
  return config
}, async (error) => {
  console.log(error, 888888)
  const originalConfig = error.config
  if (error.response.status === 401 && originalConfig && !originalConfig._retry) {
    originalConfig._retry = true
    try {
      const response = await defaultApiInstance.get('/refresh')
      localStorage.setItem('token', response.data.accessToken)
      return bearerApiInstance.request(originalConfig)
    } catch (error) {
      console.log(error)
    }
  }
  throw error
})
