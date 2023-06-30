import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import omit from 'lodash/omit'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { Helmet } from 'react-helmet-async'

import { path } from '../../Components/Contants/path'
import { schema, SchemaForm } from '../../Components/Utils/rule'
import { Input } from '../../Components/Input/Input'
import { registerApi } from '../../Components/Api/Auth'
import { Generality } from '../../Types/Generality.type'
import { UNPROCESSABLE_ENTITYError } from '../../Components/Utils/errorApi'
import { Button } from '../../Components/Button/Button'
import { AppContext } from '../../useContext/useContext'

const shemaRegister = schema.pick(['email', 'password', 'confirm_password'])
type PropRegister = Pick<SchemaForm, 'email' | 'password' | 'confirm_password'>
const Register = () => {
  const navigate = useNavigate()
  const { setAuthorization, setProfile } = useContext(AppContext)

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<PropRegister>({
    defaultValues: {
      email: '',
      password: '',
      confirm_password: ''
    },
    resolver: yupResolver(shemaRegister)
  })
  const { mutate, isLoading } = useMutation({
    mutationFn: (body: Pick<SchemaForm, 'email' | 'password'>) => registerApi(body)
  })

  const onSubmit = (data: PropRegister) => {
    mutate(omit(data, ['confirm_password']), {
      onSuccess: (data) => {
        setAuthorization(true)
        setProfile(data.data.data.user)
        navigate('/login')
      },
      onError: (error) => {
        if (UNPROCESSABLE_ENTITYError<Generality<Pick<SchemaForm, 'email' | 'password'>>>(error)) {
          const errorResponse = error.response?.data?.data
          errorResponse &&
            Object.keys(errorResponse).forEach((error) => {
              setError(error as keyof Pick<SchemaForm, 'email' | 'password'>, {
                message: errorResponse[error as keyof Pick<SchemaForm, 'email' | 'password'>],
                type: 'Server'
              })
            })
        }
      }
    })
  }

  return (
    <div className=' lg:bg-no-repeat w-full lg:h-[100vh] lg:bg-cover  lg:relative'>
      <Helmet>
        <title>Đăng Ký</title>
        <meta name='Đăng Ký' content='đây là trang đăng ký' />
      </Helmet>
      <img
        src='https://torog.vn/upload/image/1669190563439-%C4%91%C4%83ng%20k%C3%BD%20b%C3%A1n%20tr%C3%AAn%20shopee%20food.jpg'
        alt='ảnh trang chủ'
        className='w-full  h-full object-cover'
      />
      <div className=' lg:right-[200px] lg:top-[50%] lg:translate-y-001 lg:absolute  mt-[20px]'>
        <form
          className='bg-white w-full  lg:w-[400px] px-[24px] pb-[36px] lg:pt-[36px]'
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className='text-[25px] font-bold mb-[20px] w-full text-center'>Đăng Ký</h2>

          <Input
            name='email'
            register={register}
            nameSpace='Email'
            placeholder='Email'
            type='email'
            className='flex flex-col h-[100px] '
            classNameInput='h-[40px] outline-0  border-colorInput border my-[10px]  pl-[8px] '
            messageError={errors.email?.message}
          />
          <Input
            className='flex flex-col h-[100px] relative'
            name='password'
            register={register}
            type='password'
            messageError={errors.password?.message}
            nameSpace='password'
            classNameInput='h-[40px] outline-0  border-colorInput border my-[10px]  pl-[8px] '
            placeholder='Password'
          />
          <Input
            name='confirm_password'
            type='password'
            nameSpace='Confirm Password'
            register={register}
            classNameInput='h-[40px] outline-0  border-colorInput border my-[10px]  pl-[8px] '
            className='flex flex-col h-[100px] relative'
            messageError={errors.confirm_password?.message}
            placeholder='nhập lại password'
          />
          <Button
            className='h-[50px] w-full flex items-center text-center justify-center  bg-orange text-white border mt-[20px] '
            type='submit'
            isLoading={isLoading}
            disabled={isLoading}
          >
            Đăng Nhập
          </Button>

          <div className='w-full flex items-center justify-center py-[20px]'>
            <p className='mr-2'>Bạn mới biết đến Shoppe?</p>
            <Link to={path.login} className='text-orange'>
              Đăng Nhập
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
