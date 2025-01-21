import { z } from 'zod'

const userBase = {
  email: z.string().email(),
  password: z.string().min(3).max(20),
}

const userSignIn = {
  ...userBase
}

const userSignUp = {
  ...userBase
}


const SignInSchema = z.object(userSignIn)
const SignUpSchema = z.object(userSignUp)

type TSignInSchema = z.infer<typeof SignInSchema>
type TSignUpSchema = z.infer<typeof SignUpSchema>

export { 
  SignInSchema, type TSignInSchema ,
  SignUpSchema, type TSignUpSchema
}
