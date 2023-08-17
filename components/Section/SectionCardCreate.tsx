import { AppDispatch } from '@/redux/notebooksStore'
import { createSection } from '@/redux/sectionsSlice'
import { useState } from 'react'
import { SubmitHandler, set, useForm } from 'react-hook-form'
import { BsPlusCircle } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import CustomDialog from '../CustomDialog'
import Input from '../Input'
import { toast } from 'react-hot-toast'

interface SectionCardCreateProps {
  notebook_id: number
}

type CreateSectionInputs = {
  title: string
}

const SectionCardCreate: React.FC<SectionCardCreateProps> = ({ notebook_id }) => {
  const [createOpen, setCreateOpen] = useState<boolean>(false) 
  const [createLoading, setCreateLoading] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()

  const { register, handleSubmit } =
  useForm<CreateSectionInputs>({
    defaultValues: {
      title: ''
    }
  })

  const onCreateSection: SubmitHandler<CreateSectionInputs> = (formData) => {
    // Disable the form while we're creating a new section
    setCreateLoading(true)

    // Create Section action being dispatched
    const creation = dispatch(createSection({
      title: formData.title,
      notebook_id: notebook_id
    }))

    creation
    .then(() => setCreateOpen(false))
    .catch((error) => console.log(error))
    .finally(() => setCreateLoading(false))

    toast.promise(creation, {
      loading: 'Creating section...',
      success: 'Section created!',
      error: 'Failed to create section'
    })
  }

  return (
    <>
      <CustomDialog
          title='Create Section'
          description='Give this section a name!'
          open={createOpen}
          onOpenChange={(open) => setCreateOpen(open)}
        >
          <form onSubmit={handleSubmit(onCreateSection)}>
            <div className='my-6 flex flex-col gap-2'>
              <label className='text-sm'>Section Title</label>
              <Input 
                placeholder='Title'
                disabled={createLoading}
                {...register('title')}
              />
            </div>
            <Input 
              type='submit'
              disabled={createLoading}
            />
          </form>
      </CustomDialog> 

      <div
        onClick={() => setCreateOpen(true)}
        className='
          theme-background
          hover:bg-neutral-800
          theme-border 
          border-dashed
          border-b
          flex items-center gap-2 px-2 py-2
          theme-text-colors text-base
          dark:text-primary-light
          group cursor-pointer
          active:opacity-50
        '
      >
        <div className='
            flex-1 line-clamp-2
            flex items-center gap-2
          '
        >
          <div className='p-1'>
            <BsPlusCircle
              size={22}
            />
          </div>
          Create section
        </div>
      </div>
    </>
    
  )
}

export default SectionCardCreate