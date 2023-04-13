import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import pick from 'lodash/pick'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'

import { schema, SchemaForm } from '../../../../Components/Utils/rule'
import { meApi } from '../../../../Components/Api/me'
import { UNPROCESSABLE_ENTITYError } from '../../../../Components/Utils/errorApi'
import { Generality } from '../../../../Types/Generality.type'
import { Button } from '../../../../Components/Button/Button'
import { Input } from '../../../../Components/Input/Input'
type PropsChangePassword = Pick<SchemaForm, 'password' | 'passwordConfirm' | 'new_password'>
const schemaChangePassword = schema.pick(['password', 'passwordConfirm', 'new_password'])

const ChangePassword = () => {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm<PropsChangePassword>({
    defaultValues: {
      password: '',
      passwordConfirm: '',
      new_password: ''
    },
    resolver: yupResolver(schemaChangePassword)
  })
  const updateMeMuTaTion = useMutation({
    mutationFn: (body: Omit<PropsChangePassword, 'passwordConfirm'>) => meApi.updateMe(body)
  })
  const onSubmit = handleSubmit((data: PropsChangePassword) => {
    updateMeMuTaTion.mutate(pick(data, ['new_password', 'password']), {
      onSuccess: () => {
        reset()

        toast.success('change password successfully')
      },
      onError: (err) => {
        if (UNPROCESSABLE_ENTITYError<Generality<PropsChangePassword>>(err)) {
          const errorPassword = err?.response?.data.data
          errorPassword &&
            Object.keys(errorPassword).forEach((error) => {
              setError(error as keyof PropsChangePassword, {
                message: errorPassword[error as keyof PropsChangePassword],
                type: 'server'
              })
            })
        }
      }
    })
  })

  return (
    <div className='lg:px-10 py-5 bg-white'>
      <Helmet>
        <meta name='Change Password' content='content description change password' />
        <title>Thay Đổi Mật Khẩu</title>
      </Helmet>
      <div className='mb-5 w-full text-center ls:mt-[100px]'>
        <h1 className='lg:text-2xl text-xl w-full text-center'>{t('profile.SetPassword')}</h1>
        <p className='mt-[6px] text-sm lg:block hidden'>{t('profile.ManagerPassword')}</p>
      </div>
      <div className='border w-[80%] m-auto  my-[20px] bg-blackWhite lg:block hidden h-[1px] '></div>
      <div className='w-full items-center flex justify-center m-auto '>
        <form onSubmit={onSubmit} className='lg:py-4'>
          <div className='w-full flex items-center justify-center'>
            <Input
              name='password'
              type='password'
              register={register}
              classNameInput='h-[40px] lg:w-[360px] w-[300px]  items-center outline-0 border-colorInput border my-[10px]  pl-[8px] '
              className='flex flex-col h-[100px] relative'
              placeholder='Nhập password cũ'
              messageError={errors.password?.message}
              nameSpace={t('profile.OldPassword')}
            />
          </div>
          <div className='w-full flex items-center justify-center'>
            <Input
              name='new_password'
              type='password'
              register={register}
              classNameInput='h-[40px]  lg:w-[360px] w-[300px]  items-center outline-0  border-colorInput border my-[10px]  pl-[8px]  '
              className='flex flex-col h-[100px] relative'
              placeholder='Nhập password mới'
              messageError={errors.new_password?.message}
              nameSpace={t('profile.NewPassword')}
            />
          </div>
          <div className='w-full  flex items-center justify-center'>
            <Input
              name='passwordConfirm'
              type='password'
              className='flex flex-col h-[100px] relative'
              register={register}
              classNameInput='h-[40px]  lg:w-[360px] w-[300px]  items-center outline-0  border-colorInput border my-[10px]  pl-[8px]  '
              placeholder='Nhập lại mật khẩu'
              messageError={errors.passwordConfirm?.message}
              nameSpace={t('profile.ConfirmPassword')}
            />
          </div>

          <div className='w-full items-center flex justify-center m-auto pt-6'>
            {' '}
            <Button className='bg-orange text-white py-3 px-4  items-center'>{t('profile.Confirm')}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default ChangePassword
