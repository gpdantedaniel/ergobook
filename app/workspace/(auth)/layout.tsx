'use client'
import { Provider } from 'react-redux'
import { store } from '@/redux/notebooksStore'
import { ThemeProvider } from 'next-themes'

const layout = ({ children } : { children: React.ReactNode}) => {
  return (
    <ThemeProvider attribute='class'>
      <Provider store={store}>
        <div className='flex-1 h-full'>
          { children }
        </div>
      </Provider>
    </ThemeProvider>
    
  )
}

export default layout