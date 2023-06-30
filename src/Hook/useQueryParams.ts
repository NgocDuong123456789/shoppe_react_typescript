import { useSearchParams } from 'react-router-dom'
import queryString from 'query-string'
export const useQueryParams = () => {
  const [searchParam] = useSearchParams()
  //  return Object.fromEntries([...searchParam])
   return queryString.parse(window.location.search)
}

// cách 2 sử dụng query string với tham số truyền vào là window.location.search 
// const return  query=queryString.parse(windown.location.search)
