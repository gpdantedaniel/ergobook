import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic' // This is a hack to force Next.js to re-render this page on every request.

const WorkspaceLayout = async ({ children } : { children: React.ReactNode }) => {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  // All pages under "workspace" are protected
  if (!user) redirect('/login')

  return (
    <div className='flex-1 h-full'>
      { children }
    </div>
  )
}

export default WorkspaceLayout