import { BsPersonCircle } from 'react-icons/bs'
import { AiOutlineMenu } from 'react-icons/ai'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import ThemeButton from './ThemeButton'

const Header = async () => {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className='fixed z-50 w-full h-16 flex justify-center border-b border-neutral-500 backdrop-blur-md bg-white/30 dark:bg-neutral-700/30'>
      <div className='w-full md:w-10/12 px-4 md:px-0 flex items-center justify-start gap-3 md:gap-0 md:justify-between'>
        <div className='block md:hidden'>
          <AiOutlineMenu size={22}/>
        </div>
        <div className='font-source-serif text-2xl'>Ergobook</div>
        <div className='hidden md:flex items-center gap-3 cursor-pointer'>
          <div className='text-base'>
            {user?.email}
          </div>
          <BsPersonCircle size={22}/>
          <ThemeButton/>
        </div>
      </div>
    </div>
  )
}

export default Header