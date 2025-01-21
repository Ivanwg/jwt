import { bearerApiInstance, defaultApiInstance } from './instance'
import { AxiosResponse } from 'axios'
import { IAuthResponse } from '../models'

export class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<IAuthResponse>> {
    return bearerApiInstance.post<IAuthResponse>('/login', { email, password })
  }
  static async register(
    email: string,
    password: string
  ): Promise<AxiosResponse<IAuthResponse>> {
    return bearerApiInstance.post<IAuthResponse>('/register', { email, password })
  }

  static async logout(): Promise<AxiosResponse<void>> {
    return bearerApiInstance.post('/logout')
  }

  static refresh(): Promise<AxiosResponse<IAuthResponse>> {
    return defaultApiInstance.get('/refresh')
  }
}
