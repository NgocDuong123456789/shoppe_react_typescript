import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'

import { useQueryParams } from './useQueryParams'
import { QueryConfigs } from '../Types/Generality.type'

export const QueryParams = () => {
  const queryParam = useQueryParams()
  const QueryParams: QueryConfigs = omitBy(
    {
      page: queryParam?.page ?? '1',
      limit: queryParam?.limit ?? '10',
      order: queryParam?.order,
      sort_by: queryParam?.sort_by ?? 'sold',
      category: queryParam?.category,
      exclude: queryParam?.exclude,
      rating_filter: queryParam?.rating_filter,
      price_max: queryParam?.price_max,
      price_min: queryParam?.price_min,
      name: queryParam?.name
    },
    isUndefined
  )
  return QueryParams
}
