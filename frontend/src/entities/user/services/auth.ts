import { apiInstance } from '@/shared/api'
import { AxiosResponse } from 'axios'
import { IAuthResponse } from '../models'

export class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<IAuthResponse>> {
    return apiInstance.post<IAuthResponse>('/login', { email, password })
  }
  static async register(
    email: string,
    password: string
  ): Promise<AxiosResponse<IAuthResponse>> {
    return apiInstance.post<IAuthResponse>('/register', { email, password })
  }

  static async logout(): Promise<AxiosResponse<void>> {
    return apiInstance.post('/logout')
  }
}
