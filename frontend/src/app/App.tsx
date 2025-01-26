import './styles/index.css'
import { AppProvider } from './providers'
import { LoginForm, RegisterForm } from '@/features'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useStore } from '@/entities/user'
import { Button } from '@/shared/ui'

function App() {
  const { store } = useStore()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  return (
    <AppProvider>
      <div className="flex flex-col gap-10">
        {
          store.isAuth && !store.user?.isVerified &&
            <div className="rounded-md bg-green-50 p-4">
              Подтвердите почту
            </div>
        }
        {
          store.isLoading ? <div className="">загрузка...</div> :
            !store.isAuth ?
              <div className="flex flex-col gap-3 p-10">
                <LoginForm />
                <RegisterForm />
              </div> :
              <div className="flex flex-col gap-8">
                Вы вошли в акканту под почтой {store.user.email}
                <Button onClick={() => store.logout()}>
                  Выйти
                </Button>
              </div>
        }
      </div>
    </AppProvider>
  )
}

const ObservedApp = observer(App);

export default ObservedApp
