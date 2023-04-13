import { createContext, useState } from 'react'

import { PropPurchase } from '../Types/product.type'
import { getAccessToken, getProfile } from '../Components/Utils/localstorage'
import { User } from '../Types/user.type'

interface Props {
  children: React.ReactNode
  defaultValue?: Initial
}
interface ExtendedPurchase extends PropPurchase {
  disable: boolean
  checked: boolean
}
interface Initial {
  reset: () => void
  authorization: boolean
  setAuthorization: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  setPurchase: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
  purchase: ExtendedPurchase[]
}

export const getInitaAppContext: () => Initial = () => {
  return {
    authorization: Boolean(getAccessToken()),
    setAuthorization: () => null,
    profile: getProfile(),
    setProfile: () => null,
    reset: () => null,
    setPurchase: () => null,
    purchase: []
  }
}

// const initial: Initial = {
//   authorization: Boolean(getAccessToken()),
//   setAuthorization: () => null,
//   profile: getProfile(),
//   setProfile: () => null,
//   reset: () => null,
//   setPurchase: () => null,
//   purchase: []
// }

const initial = getInitaAppContext()

export const AppContext = createContext<Initial>(initial)

export const Provider = ({ children, defaultValue = initial }: Props) => {
  const [authorization, setAuthorization] = useState<boolean>(defaultValue.authorization)
  const [profile, setProfile] = useState<User | null>(defaultValue.profile)
  const [purchase, setPurchase] = useState<ExtendedPurchase[]>(defaultValue.purchase)
  const reset = () => {
    setAuthorization(false)
    setProfile(null)
  }
  return (
    
    <AppContext.Provider value={{ authorization, setAuthorization, profile, setProfile, reset, purchase, setPurchase }}>
      {children}
    </AppContext.Provider>
  )
}
