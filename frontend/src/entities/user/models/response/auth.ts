import { IUser } from '../item'

export interface IAuthResponse {
  accessToken: string
  user: IUser
}
