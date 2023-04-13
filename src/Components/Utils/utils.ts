import { baseURL } from '../Contants/config'
import userImage from '../../../src/assets/image-user.jpg'

export const NumberFormat = (price: number) => {
  return new Intl.NumberFormat('de-DE').format(price)
}

export const CurryToNumber = (price: number) => {
  if (price >= 1000 && price < 1000000) {
    return (price / 1000).toFixed(1) + 'k'
  } else if (price >= 1000000) {
    return (price / 1000000).toFixed(1) + 'm'
  } else {
    return price.toString()
  }
}

export const removeSpecialCharacters = (str: string) => {
  // eslint-disable-next-line no-useless-escape
  return str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')
}

export const getPathProductDetail = (name: string, id: string) => {
  return removeSpecialCharacters(name).replace(/\s/g, '-') + '-i,' + id
}

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i,')
  return arr[arr.length - 1]
}

export const getAvatar = (nameImage?: string) => {
  return nameImage ? `${baseURL}images/${nameImage}` : userImage
}
