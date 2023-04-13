import { Outlet } from 'react-router-dom'

import { UserSidebar } from '../Component/UserSidebar/UserSidebar'

const LayoutUser = () => {
  return (
    <div className='lg:grid lg:grid-cols-12 lg:gap-5 lg:px-20 lg:py-10 bg-blackWhite w-full'>
      <div className='lg:col-span-3 w-full '>
        <UserSidebar />
      </div>

      <div className='lg:col-span-9 '>
        <Outlet />
      </div>
    </div>
  )
}
export default LayoutUser
