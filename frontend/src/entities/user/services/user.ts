import { AxiosResponse } from 'axios'
import { apiInstance } from '../api'
import { IUser } from '../models'

export class UserService {
  static async getList(): Promise<AxiosResponse<Array<IUser>>> {
    return bearerApiInstance.get<Array<IUser>>('/users')
  }
}
