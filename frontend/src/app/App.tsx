import './styles/index.css'
import { AppProvider } from './providers'
import { LoginForm, RegisterForm } from '@/features'

function App() {
  return (
    <AppProvider>
      <div className="flex flex-col gap-3 p-10">
        <LoginForm />
        <RegisterForm />
      </div>
    </AppProvider>
  )
}

export default App
