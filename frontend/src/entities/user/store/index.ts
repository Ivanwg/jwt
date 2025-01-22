import { makeAutoObservable } from 'mobx'
import { IUser } from '../models'
import { AuthService } from '../services/auth'
import { createContext, useContext } from 'react'

// TODO - типизация ошибки

class Store {
  user = {} as IUser
  isAuth = false
  isLoading = false
  error = ''

  constructor() {
    makeAutoObservable(this)
  }

  setLoading(bool: boolean) {
    this.isLoading = bool
  }

  setAuth(bool: boolean) {
    this.isAuth = bool
  }

  setUser(user: IUser) {
    this.user = user
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password)
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (error) {
      console.log(error)
    }
  }

  async register(email: string, password: string) {
    try {
      const response = await AuthService.register(email, password)
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (error) {
      console.log(error)
    }
  }

  async logout() {
    try {
      await AuthService.logout()
      localStorage.removeItem('token')
      this.setAuth(false)
      this.setUser({} as IUser)
    } catch (error) {
      console.log(error)
    }
  }

  async checkAuth() {
    this.setLoading(true)
    try {
      const response = await AuthService.refresh()
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (error) {
      console.log(error)
    } finally {
      this.setLoading(false)
    }
  }
}

interface IStore {
  store: Store
}

const store = new Store
const StoreContext = createContext<IStore>({
  store
})

const useStore = () => useContext(StoreContext)

export { store, type IStore, StoreContext, useStore }
