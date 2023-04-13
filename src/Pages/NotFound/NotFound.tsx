import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import {memo} from 'react'

 const NotFound = () => {
  return (
    <main className='grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8'>
      <Helmet>
        <title>My Notfound</title>
        <meta name='Notfound' content='content description NotFound' />
      </Helmet>
      <div className='text-center'>
        <p className='text-base font-semibold text-indigo-600'>404</p>
        <h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'>4Page not found</h1>
        <p className='mt-6 text-base leading-7 text-gray-600'>Sorry, we couldn’t find the page you’re looking for.</p>
        <div className='mt-10 flex items-center justify-center gap-x-6'>
          <Link
            to='/'
            className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-orange hover:text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-orange'
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  )
}

export default memo(NotFound)
