'use client'
import { Provider } from 'react-redux'
import { store } from '@/redux/notebooksStore'
import { ThemeProvider } from 'next-themes'
import Header from '@/components/Header'

const layout = ({ children } : { children: React.ReactNode}) => {
  return (
    <ThemeProvider attribute='class'>
      <Provider store={store}>
        <div 
          className='
            theme-background
            w-screen h-screen 
            overflow-x-hidden 
            overflow-y-auto
            relative
          '
        >
          <Header/>
          { children }
        </div>
      </Provider>
    </ThemeProvider>
    
  )
}
 
export default layout