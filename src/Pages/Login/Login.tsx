import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { Helmet } from 'react-helmet-async'

import { Generality } from '../../Types/Generality.type'
import { UNPROCESSABLE_ENTITYError } from '../../Components/Utils/errorApi'
import { Button } from '../../Components/Button/Button'
import { Input } from '../../Components/Input/Input'
import { loginApi } from '../../Components/Api/Auth'
import { path } from '../../Components/Contants/path'
import { schema, SchemaForm } from '../../Components/Utils/rule'
import { AppContext } from '../../useContext/useContext'

type PropLogin = Pick<SchemaForm, 'email' | 'password'>
const schemaLogin = schema.pick(['email', 'password'])

const Login = () => {
  const { setAuthorization, setProfile } = useContext(AppContext)
  const navigate = useNavigate()

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<PropLogin>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(schemaLogin)
  })
  const { mutate, isLoading } = useMutation({
    mutationFn: (body: PropLogin) => loginApi(body)
  })

  const onSubmit = (data: PropLogin) => {
    mutate(data, {
      onSuccess: (data) => {
        setAuthorization(true)
        setProfile(data.data.data.user)
        navigate('/')
      },

      onError: (error) => {
        if (UNPROCESSABLE_ENTITYError<Generality<PropLogin>>(error)) {
          const errorResponse = error.response?.data?.data
          errorResponse &&
            Object.keys(errorResponse).forEach((error) => {
              setError(error as keyof PropLogin, {
                message: errorResponse[error as keyof PropLogin],
                type: 'Server'
              })
            })
        }
      }
    })
  }

  return (
    <>
      <div className=' lg:bg-no-repeat w-full lg:h-[100vh] lg:bg-cover  lg:relative'>
        <Helmet>
          <title>Đăng nhập</title>
          <meta name='Đăng nhập' content='đây là page đăng nhập' />
        </Helmet>
        <img
          src='https://logodix.com/logo/2015079.png'
          alt='ảnh trang chủ'
          className='w-full h-full object-cover'
        />

        <div className=' lg:right-[200px] lg:top-[50%] lg:translate-y-001 lg:absolute  mt-[20px]'>
          <form
            className='bg-white w-full  lg:w-[400px] px-[24px] pb-[36px] lg:pt-[36px]  rounded-lg'
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className='text-[25px] font-bold  w-full text-center'>Đăng Nhập</h2>

            <Input
              className='flex flex-col h-[100px] my-5 '
              name='email'
              register={register}
              nameSpace='Email'
              placeholder='Email'
              type='email'
              classNameInput='h-[40px] outline-0  border-colorInput border my-[5px]  pl-[8px] '
              messageError={errors.email?.message}
            />
            <Input
              className='flex flex-col h-[100px] relative'
              name='password'
              register={register}
              type='password'
              messageError={errors.password?.message}
              nameSpace='Mật khẩu'
              classNameInput='h-[40px] outline-0  border-colorInput border my-[5px]  pl-[8px] '
              placeholder='Mật khẩu'
            />

            <Button
              className='h-[50px] w-full rounded-md flex items-center text-center justify-center  bg-orange text-white border mt-[20px] '
              type='submit'
              isLoading={isLoading}
              disabled={isLoading}
            >
              Đăng Nhập
            </Button>

            <div className='w-full flex items-center justify-center py-[20px]'>
              <p className='mr-2'>Bạn mới biết đến Shoppe?</p>
              <Link to={path.register} className='text-orange'>
                Đăng Ký
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
