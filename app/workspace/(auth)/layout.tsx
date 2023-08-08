'use client'
import { Provider } from 'react-redux'
import { store } from '@/redux/notebooksStore'

const layout = ({ children } : { children: React.ReactNode}) => {
  return (
    <Provider store={store}>
      <div className='flex-1 h-full'>
        { children }
      </div>
    </Provider>
  )
}

export default layout