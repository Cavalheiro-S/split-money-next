import { Loading } from '@/components/Loading/Loading'
import { AppDispatch, RootState } from '@/store'
import { setUserError, signInAsync } from '@/store/features/user/UserSlice'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Form, Input } from 'antd'
import { useRouter } from 'next/navigation'
import { Suspense, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormItem } from 'react-hook-form-antd'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import * as z from 'zod'

interface Inputs {
  email: string,
  password: string
}

const schema = z.object({
  email: z.string().nonempty({ message: "Email não pode ser vazio" }),
  password: z.string().nonempty({ message: "Senha não pode ser vazio" })
})

export default function Login() {

  const { handleSubmit, control } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: ""
    },
    resolver: zodResolver(schema)
  })
  const { error, isAuthenticated, loading } = useSelector((state: RootState) => state.userState)
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    isAuthenticated && router.push('/dashboard')

    return () => {
      dispatch(setUserError(""))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, router])

  const OnSubmit: SubmitHandler<Inputs> = async data => {
    try {
      const something = await dispatch(signInAsync({ email: data.email, password: data.password }))
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
      <Form layout='vertical' onFinish={handleSubmit(OnSubmit)}>
        {<span className='font-bold text-red-500'>{error}</span>}
        <FormItem
          label="Email"
          name='email'
          control={control}
        >
          <Input size='large' placeholder='Adicione seu email' />
        </FormItem>
        <FormItem
          label="Senha"
          name='password'
          control={control}
        >
          <Input.Password size='large' type='password' placeholder='********' />
        </FormItem>
        <div className='flex flex-col gap-4'>
          <Button htmlType="submit" size='large'>Entrar</Button>
        </div>
      </Form>
    </div>
  )
}
