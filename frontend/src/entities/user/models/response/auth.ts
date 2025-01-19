import { IUser } from '../item'

export interface IAuthResponse {
  accessToken: string
  refreshToken: string
  user: IUser
}
