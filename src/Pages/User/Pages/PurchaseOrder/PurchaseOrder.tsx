import { Link, createSearchParams } from 'react-router-dom'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

import { queryStatus } from '../../../../Components/queryStatus/queryStatus'

const PurchaseOrder = () => {
  const query = queryStatus()
  const arrayList = ['Tất Cả', 'Chờ Thanh Toán', 'Vận Chuyển', 'Đang Giao', 'Hoàn Tiền', 'Đã Hủy', 'Thành Tiền']
  const { t } = useTranslation()
  return (
    <div>
      <Helmet>
        <meta name='Purchase Order' content='content description Purchase Order' />
        <title>Đơn Mua Sản Phẩm</title>
      </Helmet>
      <div className='w-full items-center lg:flex  justify-between bg-white ls:block hidden'>
        {arrayList.map((item, index) => {
          return (
            <Link
              to={{
                pathname: '/user/purchaseOrder',
                search: createSearchParams({
                  ...query,
                  status: String(index - 1)
                }).toString()
              }}
              key={index}
              className={classNames('text-base text-center w-full py-5 ', {
                'text-orange border-b-2 border-orange': Number(query.status) === index - 1,
                'text-black': Number(query.status) !== index - 1
              })}
            >
              {t(`profile.${item}`)}
            </Link>
          )
        })}
      </div>
      <div className='bg-white shadow px-[150px]  py-[150px] m-auto relative mt-[20px]'>
        <div className='top-[50%] left-[50%]  translate-x-001 translate-y-001 absolute'>
          <div className='w-[150px] h-[150px] '>
            <img
              className='w-full h-full object-cover flex items-center justify-center'
              src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/9bdd8040b334d31946f49e36beaf32db.png'
              alt='ảnh cart trống'
            />
          </div>
          <p className='lg:text-lg text-md text-black mt-[10px] w-full text-center'>{t('Cart.EmptyCart')}</p>
        </div>
      </div>
    </div>
  )
}

export default PurchaseOrder
