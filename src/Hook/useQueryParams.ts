import { useSearchParams } from 'react-router-dom'

export const useQueryParams = () => {
  const [searchParam] = useSearchParams()
  return Object.fromEntries([...searchParam])
}
