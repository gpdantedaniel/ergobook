import { BsPersonCircle } from 'react-icons/bs'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const Header = async () => {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className='w-full h-16 flex justify-center border-b border-neutral-500'>
      <div className='w-10/12 flex items-center justify-between'>
        <div className='font-source-serif text-2xl'>Ergobook</div>
        <div className='flex items-center gap-3 cursor-pointer'>
          <div className='text-base'>
            {user?.email}
          </div>
          <BsPersonCircle size={22}/>
        </div>
      </div>
    </div>
  )
}

export default Header