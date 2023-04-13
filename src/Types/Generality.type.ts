export interface Generality<T> {
  message: string
  data: T
}

export type QueryParam = {
  page?: number
  limit?: number
  order?: string
  sort_by?: string
  category?: string
  exclude?: string
  rating_filter?: number
  price_max?: number
  name?: string
  price_min?: number
}

export type QueryConfigs = {
  [key in keyof QueryParam]: string
}

export interface Paginations {
  limit: number
  page: number
  page_size: number
}

export interface queryStatus {
   status: number
}

export type queryStatusString = {
  [key in keyof queryStatus]: string
}
