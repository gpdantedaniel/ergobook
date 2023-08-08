import './globals.css'
import ToastProvider from '@/providers/ToastProvider'

export const metadata = {
  title: 'Ergobook',
  description: 'For better and faster note-taking',
}

export default function RootLayout({ children } : { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider/>
        <div className='w-screen h-screen flex-col'>
          {children}
        </div>
      </body>
    </html>
  )
}
