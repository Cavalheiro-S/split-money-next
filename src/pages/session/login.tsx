import GoogleLogo from '@/assets/imgs/icons8-google-logo.svg'
import { Input } from '@/components/Input/Input'
import { AppDispatch, RootState } from '@/store'
import { getUserByEmail, signInAsync } from '@/store/features/user/UserSlice'
import { GoogleOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

interface Inputs {
  email: string,
  password: string
}

export default function Login() {

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<Inputs>()
  const { user } = useSelector((state: RootState) => state.userState)
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  // useEffect(() => {
  //   const token = localStorage.getItem('split.money.token')
  //   const tokenExpiredAt = new Date(localStorage.getItem('split.money.expiresAt') ?? "")

  //   const getData = async () => {
  //     if (token && new Date() < tokenExpiredAt) {
  //       await dispatch(getUserByEmail({ email: user.email }))
  //     }
  //   }

  //   getData()
  // }, [])

  const handleGoogleSignin = async () => {
    await signIn('index', { callbackUrl: "/" })
  }

  const OnSubmit: SubmitHandler<Inputs> = async data => {
    await dispatch(signInAsync({ email: data.email, password: data.password }))
    await dispatch(getUserByEmail({ email: data.email }))
    router.push("/dashboard")
  }

  return (

    <div className='flex flex-col gap-5 p-8 bg-white rounded'>
      <div>
        <h3 className='text-2xl font-semibold'>Acesse sua conta</h3>
        <span className='text-gray-500'>Informe seus dados para acessar , ou acesse com outra forma de login</span>
      </div>
      <form onSubmit={handleSubmit(OnSubmit)} className='flex flex-col gap-5'>
        <label>
          Email
          <Input.Root>
            <Input.Input {...register("email")} type="email" placeholder='email@email.com' />
          </Input.Root>
        </label>
        <label>
          Senha
          <Input.Root>
            <Input.Password {...register("password")} placeholder='********' />
          </Input.Root>
        </label>
        <Button htmlType="submit" size='large'>Entrar</Button>
        <Button
          size='large'
          icon={<GoogleOutlined />}
          onClick={handleGoogleSignin}>
          Entrar com Google
        </Button>
      </form>
    </div>
  )
}
