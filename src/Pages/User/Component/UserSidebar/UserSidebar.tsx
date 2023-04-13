import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { getAvatar } from '../../../../Components/Utils/utils'

import { path } from '../../../../Components/Contants/path'
import { meApi } from '../../../../Components/Api/me'

export const UserSidebar = () => {
  const { t } = useTranslation()
  const { data } = useQuery({
    queryKey: ['me'],
    queryFn: () => meApi.getApiMe()
  })

  return (
    <div className='lg:w-full lg:flex lg:items-center lg:justify-center'>
      <div>
        <div className='items-center hidden lg:flex '>
          <img
            src={getAvatar(data?.data.data?.avatar)}
            alt='avatar'
            className='w-12 h-12 rounded-full object-cover mr-5'
          />
          <h3 className='font-bold'>{data?.data.data?.name}</h3>
        </div>
        <div className='flex mt-6 w-full '>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 lg:block hidden'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
            />
          </svg>
          <div className='text-[14px] ls:py-4 w-full  ls:flex ls:items-center ls:fixed ls:top-[50px] ls:justify-between ls:bg-white ls:drop-shadow-sm ls:px-10 z-10'>
            <p className='lg:block hidden'>{t('profile.MyAcount')}</p>
            <div className='lg:my-2 lg:text-sm  text-[12px] '>
              <Link
                to={path.profile}
                className={classNames('', {
                  'text-orange': path.profile === window.location.pathname
                })}
              >
                {t('profile.MyProfile')}
              </Link>
            </div>
            <div className=' lg:text-sm  text-[12px]'>
              {' '}
              <Link
                to={path.changePassword}
                className={classNames('', {
                  'text-orange': path.changePassword === window.location.pathname
                })}
              >
                {t('profile.ChangePassword')}
              </Link>
            </div>

            <div className='lg:pt-2 lg:text-sm  text-[12px]'>
              {' '}
              <Link
                to={path.purchaseOrder}
                className={classNames('', {
                  'text-orange': path.purchaseOrder === window.location.pathname
                })}
              >
                {t('profile.MyPurchase')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
