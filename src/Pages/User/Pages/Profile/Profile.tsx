import { useQuery, useMutation } from '@tanstack/react-query'
import { useForm, Controller } from 'react-hook-form'
import { useState, useEffect, useRef, useMemo } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { toast } from 'react-toastify'

import { SchemaForm, schema } from '../../../../Components/Utils/rule'
import { meApi } from '../../../../Components/Api/me'
import { Button } from '../../../../Components/Button/Button'
import { SelectBirday } from '../../../../Components/SelectBirday/SelectBirday'
import { getAvatar } from '../../../../Components/Utils/utils'
import { Input } from '../../../../Components/Input/Input'

type PropProfile = Pick<SchemaForm, 'name' | 'phone' | 'address' | 'avatar' | 'date_of_birth'>
const schemaProfile = schema.pick(['name', 'phone', 'address', 'avatar', 'date_of_birth'])

const Profile = () => {
  const { t } = useTranslation()
  const InputRef = useRef<HTMLInputElement>(null)

  const [file, setFile] = useState<File | null>(null)

  const imagePrev = useMemo(() => {
    return file && URL.createObjectURL(file)
  }, [file])

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<PropProfile>({
    defaultValues: {
      name: '',
      date_of_birth: new Date(1990, 0, 1),
      avatar: '',
      address: '',
      phone: ''
    },
    resolver: yupResolver(schemaProfile)
  })
  const avatar = watch('avatar')

  const { data: dataMe, refetch } = useQuery({
    queryKey: ['me'],
    queryFn: () => meApi.getApiMe()
  })
  const profileMe = dataMe?.data.data

  useEffect(() => {
    if (profileMe) {
      setValue('name', profileMe?.name as string)
      setValue('phone', profileMe?.phone as string)
      setValue('address', profileMe?.address as string)
      setValue('avatar', profileMe?.avatar as string)
      setValue('date_of_birth', profileMe.date_of_birth ? new Date(profileMe.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profileMe, setValue])

  const handleSelectImage = () => {
    if (InputRef.current) {
      InputRef?.current.click()
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File
    console.log(file)
    if (file && (file.size > 1024 * 1024 || !file.type.includes('image'))) {
      toast.error('ảnh phải nhỏ hơn 1MB')
    } else {
      setFile(file)
    }
  }
  const uploadProfileMutation = useMutation({
    mutationFn: (body: PropProfile) => meApi.updateMe(body)
  })
  const uploadAvavata = useMutation({
    mutationFn: (body: FormData) => meApi.uploadAvata(body)
  })

  const onSubmit = handleSubmit(async (data: PropProfile) => {
    try {
      let avatarImage = avatar as string
      if (file) {
        const formData = new FormData()
        formData.append('image', file)
        const res = await uploadAvavata.mutateAsync(formData)
        avatarImage = res.data.data as string
        setValue('avatar', avatarImage)
        refetch()
        toast.success('upload avatar successfully !')
      }

      await uploadProfileMutation.mutateAsync(
        { ...data, avatar: avatarImage, date_of_birth: data.date_of_birth },
        {
          onSuccess: (_) => {
            refetch()
            toast.success('Upload profile successfully !')
          }
        }
      )
    } catch (er) {
      console.log(er)
    }
  })

  return (
    <div className='lg:px-[100px] py-5 bg-white'>
      <Helmet>
        <meta name='Profile' content='content description  profile' />
        <title>Tài Khoản của tôi</title>
      </Helmet>
      <div className='mb-[30px]  w-full text-center ls:mt-[100px] '>
        <h2 className='lg:text-2xl text-xl ls:my-2'>{t('profile.MyProfile')}</h2>
        <p className='mt-[10px]  text-sm lg:block hidden'>{t('profile.ManagerAcount')}</p>
      </div>

      <div className='lg:block hidden border w-[80%] m-auto my-[20px] bg-blackWhite h-[1px] '></div>

      <form onSubmit={onSubmit} className='lg:py-4'>
        <div className='lg:grid lg:grid-cols-12'>
          <div className='lg:col-span-7'>
            <div className='w-full flex items-center  justify-center'>
              <Input
                register={register}
                classNameInput='h-[40px] lg:w-[360px] w-[300px] items-center outline-0 border-colorInput border my-[10px]  pl-[8px] ls:text'
                className='flex flex-col h-[120px] '
                name='name'
                messageError={errors.name?.message}
                nameSpace={t('profile.UserName')}
                placeholder='Tên:'
              />
            </div>

            <div className='w-full flex items-center  justify-center'>
              <Input
                register={register}
                className='flex flex-col h-[110px]'
                classNameInput='h-[40px] lg:w-[360px] w-[300px] items-center outline-0 border-colorInput border my-[10px]  pl-[8px] ls:text'
                name='address'
                messageError={errors.address?.message}
                nameSpace={t('profile.address')}
              />
            </div>

            <div className='w-full flex items-center  justify-center'>
              <Input
                register={register}
                className='flex flex-col h-[110px] '
                classNameInput='h-[40px] lg:w-[360px] w-[300px] items-center outline-0 border-colorInput border my-[10px]  pl-[8px] ls:text'
                name='phone'
                messageError={errors.phone?.message}
                nameSpace={t('profile.Phone')}
              />
            </div>

            <Controller
              control={control}
              name='date_of_birth'
              render={({ field }) => <SelectBirday value={field.value as Date} onChange={field.onChange} />}
            />

            <small>{errors.date_of_birth?.message}</small>
          </div>

          <div className='col-span-5 mt-[70px]'>
            <div className=' flex items-center justify-center'>
              <img
                src={(imagePrev as string) || getAvatar(avatar as string)}
                alt='avatar ảnh'
                className='w-[100px]  h-[100px] rounded-full object-cover mr-5'
              />
            </div>
            <input
              type='file'
              hidden
              ref={InputRef}
              onChange={handleOnChange}
              onClick={(e) => (e.target as any).value === null}
            />
            <div className='w-full lg:my-3  my-5 items-center flex justify-center'>
              <button type='button' onClick={handleSelectImage} className='bg-orange text-white py-2 px-5'>
                {t('profile.SelectImage')}
              </button>
            </div>
            <p className='lg:text-sm w-full  text-[12px] text-center'>{t('profile.errorImage')}</p>
          </div>
        </div>
        <div className='w-full flex items-center justify-center'>
          <Button className='bg-orange text-white py-2 px-5 my-7'>{t('profile.Save')}</Button>
        </div>
      </form>
    </div>
  )
}

export default Profile
