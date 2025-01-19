import { apiInstance } from '@/shared/api'
import { AxiosResponse } from 'axios'
import { IUser } from '../models'

export class UserService {
  static async getList(): Promise<AxiosResponse<Array<IUser>>> {
    return apiInstance.get<Array<IUser>>('/users')
  }
}
