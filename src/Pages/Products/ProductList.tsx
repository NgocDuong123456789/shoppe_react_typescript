import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'

import { AsideProduct } from './AsideProduct/AsideProduct'
import { SortProduct } from './SortProduct/SortProduct'
import { productApi } from '../../Components/Api/product.api'
import { QueryParams } from '../../Hook/QueryParams'
import { QueryConfigs } from '../../Types/Generality.type'
import { Product } from '../../Components/Product/Product'
import { Paginations } from '../../Types/Generality.type'
import { Pagination } from '../../Components/Pagination/Pagination'
import Skeleton from '../../Components/Skeleton/Skeleton'
import { product } from '../../Types/product.type'
const ProductList = () => {
  const query: QueryConfigs = QueryParams()
  const { data, isLoading } = useQuery({
    queryKey: ['productList', query],
    queryFn: () => productApi.getProduct(query),
    staleTime: 1000
  })

  return (
    <div className='flex lg:px-10 bg-blackWhite px-2 ls:pt-[45px]'>
      <Helmet>
        <meta name='Product List' content='content description  product List' />
        <title>Shoppe Việt Name | Mua Bán Thương Mại</title>
      </Helmet>
      {isLoading ? (
        <div className='w-full grid grid-cols-5 gap-4 my-10'>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <div className='grid grid-cols-12 lg:px-20 mt-6 lg:gap-10'>
          <div className='col-span-2 w-full '>
            <AsideProduct />
          </div>

          <div className='lg:col-span-10 col-span-12 '>
            <SortProduct />

            {(data?.data?.data?.products as product[])?.length > 0 ? (
              <div className='grid lg:grid-cols-5 lg:mt-[20px] lg:gap-5 grid-cols-2 md:grid-cols-4   gap-3'>
                {data?.data.data?.products.map((product) => {
                  return (
                    <div key={product._id} className='span-col-1 '>
                      <Product product={product} />
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className='bg-[white] w-full flex items-center justify-center text-[20px] h-[300px]'>
                <h2>Sản phẩm không được tìm thấy</h2>
              </div>
            )}

            {(data?.data?.data?.products as product[])?.length > 0 && (
              <div className='flex w-full  items-center m-auto justify-center text-center my-[50px] '>
                <Pagination QueryParam={query} pagination={data?.data.data.pagination as Paginations} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductList
