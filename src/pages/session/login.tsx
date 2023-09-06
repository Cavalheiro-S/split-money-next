'use client'

import { AppDispatch, RootState } from '@/store'
import { getUserByEmail, signInAsync } from '@/store/features/user/UserSlice'
import { GoogleOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

interface Inputs {
  email: string,
  password: string
}

export default function Login() {

  const { register, handleSubmit, control, formState: { errors }, setValue } = useForm<Inputs>()
  const { user } = useSelector((state: RootState) => state.userState)
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const handleGoogleSignin = async () => {
    await signIn('index', { callbackUrl: "/" })
  }

  const OnSubmit: SubmitHandler<Inputs> = async data => {
    try {
      await dispatch(signInAsync({ email: data.email, password: data.password }))
      await dispatch(getUserByEmail({ email: data.email }))
      router.replace("/dashboard")
    }
    catch (err) {
      toast.error("Não foi possível fazer o login")
    }
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
          <Controller
            name='email'
            control={control}
            rules={{ required: true }}
            render={props => <Input size='large' placeholder='email@email.com' {...props.field} />}
          />
        </label>
        <label>
          Senha
          <Controller
            name='password'
            control={control}
            rules={{ required: true }}
            render={props => <Input size='large' type='password' placeholder='********' {...props.field} />}
          />
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
