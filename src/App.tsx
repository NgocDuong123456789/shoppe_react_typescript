import { routesElement } from './useRouter'
import { ToastContainer } from 'react-toastify'
import { useEffect, useContext } from 'react'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'

import { AppContext } from './useContext/useContext'
import { LocalStorageEventTarget } from './Components/Utils/localstorage'
import { HelmetProvider } from 'react-helmet-async'


const App = () => {
  const { reset } = useContext(AppContext)
  // trong trường hợp access_token hết hạn thì xóa hết những gì lưu trên local
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', () => reset)
    return () => LocalStorageEventTarget.removeEventListener('clearLS', reset)
  }, [reset])

  return (
    <div className=" w-full ">
       <HelmetProvider>
       
        
          {routesElement()}
         <ToastContainer />
          
       
      </HelmetProvider>
     
    </div>
  )
}

export default App
