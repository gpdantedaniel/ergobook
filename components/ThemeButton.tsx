'use client'

import * as Switch from '@radix-ui/react-switch';
import { useTheme } from "next-themes";

const ThemeButton = () => {
  const { systemTheme, theme, setTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const thumbTranslate = currentTheme === 'dark' ? 'translate-x-6' : 'translate-x-0';
  const thumbBgColor = currentTheme === 'dark' ? 'bg-gray-900' : 'bg-white';

  return (
    <Switch.Root
      className={`
        relative 
        w-14 h-6 
        rounded-full shadow-md 
        transition ease-in-out 
        cursor-pointer 
        bg-gray-300 dark:bg-gray-700
        overflow-hidden
      `}
      onCheckedChange={() => theme == "dark"? setTheme('light'): setTheme("dark")}
    >
      
      <div
        className='
          w-5 h-5 
          absolute
          top-0.5 left-1
          duration-300 ease-in-out          
          rounded-full
          transition-transform 
          transform
          translate-x-7 dark:translate-x-0
          flex justify-center items-center
          text-lg
        '
      >
        {currentTheme === 'dark' ? '🌙' : '🌞'}
      </div>

      <Switch.Thumb className={`
          block w-5 h-5  
          absolute
          top-0.5 left-0.5
          duration-300 ease-in-out 
          rounded-full shadow-md 
          transition-transform 
          transform
          
          translate-x-0 dark:translate-x-8
          bg-white dark:bg-gray-900

          
        `}
      />
    </Switch.Root>
  )
}

export default ThemeButton