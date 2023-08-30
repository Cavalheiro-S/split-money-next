import GoogleLogo from '@/assets/imgs/icons8-google-logo.svg'
import { Input } from '@/components/Input/Input'
import { AppDispatch, RootState } from '@/store'
import { signInAsync } from '@/store/features/user/UserSlice'
import { GoogleOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
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

  const handleGoogleSignin = async () => {
    await signIn('index', { callbackUrl: "/" })
  }

  const OnSubmit: SubmitHandler<Inputs> = async data => {
    await dispatch(signInAsync(data))
    router.push("/")
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
