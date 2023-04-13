import { Link } from 'react-router-dom'

import { product as ProductItem } from '../../Types/product.type'
import { CurryToNumber, getPathProductDetail, NumberFormat } from '../Utils/utils'
import { ProductRating } from '../ProductRating/ProductRating'

export const Product = ({ product }: { product: ProductItem }) => {
  return (
    <Link to={`/productDetail/${getPathProductDetail(product.name, product._id)}`}>
      <div className='hover:border hover:border-orange shadow  h-full'>
        <div className='w-full pt-[100%] relative'>
          <img src={product.image} alt='ảnh mẫu' className='w-full object-cover h-full absolute top-0 left-0' />
        </div>

        <p className=' text-[13px]  px-[7px] mt-[8px] w-full truncate'>{product.name}</p>
        <div className='flex items-center w-full ml-[7px] lg:my-[9px] my-[px]'>
          <p className='line-through mr-[5px] text-#FBFBFB text-[10px] lg:text-[15px]'>{`₫${NumberFormat(
            product?.price_before_discount as number
          )}`}</p>
          -
          <p className='text-orange  ml-[5px] text-[10px] lg:text-[15px]'>{`₫${NumberFormat(
            product?.price as number
          )}`}</p>
        </div>

        <div className='ml-[7px] flex items-center lg:justify-between mx-5'>
          <ProductRating rating={product.rating} />
          <p className='text-[10px]'>{`Đã bán ${CurryToNumber(product.quantity)}`}</p>
        </div>
        <p className='ml-[5px] my-[10px]'>Hà nội</p>
      </div>
    </Link>
  )
}
