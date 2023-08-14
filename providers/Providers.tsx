'use client'

import { ThemeProvider } from "next-themes"
import { useEffect, useState } from "react"
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '@/redux/notebooksStore'

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <ThemeProvider attribute="class" enableSystem={true}>
      <ReduxProvider store={store}>
        {children}
      </ReduxProvider>
    </ThemeProvider>
  )
}

export default Providers