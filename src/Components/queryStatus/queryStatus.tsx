import { queryStatusString } from '../../Types/Generality.type'
import { useQueryParams } from '../../Hook/useQueryParams'

export const queryStatus = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const query = useQueryParams()
  const queryStatus: queryStatusString = {
    status: query?.status ?? ('-1' as string)
  }

  return queryStatus
}
