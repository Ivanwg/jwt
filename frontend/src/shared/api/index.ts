import axios, { AxiosInstance } from 'axios'

export class ApiInstance {
  public instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      withCredentials: true,
      baseURL: import.meta.env.APP_API_URL,
    });
  }
}