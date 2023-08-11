import { useState } from "react"
import { BsPlusCircle } from 'react-icons/bs'
import { useForm, SubmitHandler } from "react-hook-form"
import toast from 'react-hot-toast'

import { useDispatch } from 'react-redux'
import { AppDispatch } from "@/redux/notebooksStore"
import { createNotebook } from "@/redux/notebooksSlice"
import CustomDialog from "../CustomDialog";
import Input from "../Input";
import { ColorItem } from "@/types";
import ColorDropdown from "../ColorDropdown";

type NotebookInputs = {
  title: string
  color: ColorItem
}

const NotebookCreateCard = () => {
  const [createOpen, setCreateOpen] = useState<boolean>(false) 
  const [createLoading, setCreateLoading] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()
  const { register, handleSubmit, setValue, watch } =
  useForm<NotebookInputs>({
    defaultValues: {
      title: '',
      color: { 
        name: 'Sage Green',
        hex: '#88B493'
      }
    }
  })

  const onCreateNotebook: SubmitHandler<NotebookInputs> = (formData) => {
    // Disable the form while we're creating the notebook
    setCreateLoading(true)
    
    // Create Notebook action being dispatched
    const creation = dispatch(createNotebook({
      title: formData.title,
      color: formData.color.hex
    }))

    creation
    .then(() => setCreateOpen(false))
    .catch((error) => console.log(error))
    .finally(() => setCreateLoading(false))

    toast.promise(creation, {
      loading: 'Creating notebook...',
      success: 'Notebook successfully created!',
      error: 'Failed to create notebook.'
    })
  }

  return (
    <>
      <CustomDialog
        title='Create Notebook'
        description='Give your notebook a personality!'
        open={createOpen}
        onOpenChange={(open) => setCreateOpen(open)}
      >
        <form onSubmit={handleSubmit(onCreateNotebook)}>
          <div className='my-6 flex flex-col gap-2'>
            <label className='text-sm'>Notebook Title</label>
            <Input 
              placeholder='Title'
              disabled={createLoading}
              {...register('title')}
            />
            <label className='text-sm'>Notebook Color</label>
            <ColorDropdown 
              disabled={createLoading}
              selectedColor={watch('color')} 
              onSelectColor={(color: ColorItem) => 
                setValue('color', {
                  name: color.name,
                  hex: color.hex
                })
              }
            />
          </div>
          <Input 
            type='submit'
            disabled={createLoading}
          />
        </form>
      </CustomDialog> 
    
      <li 
        onClick={() => setCreateOpen(true)}
        className='
          w-full md:w-48 md:h-64
          p-4 gap-2
          border border-black border-dashed 
          flex flex-row md:flex-col items-center justify-center
          hover:bg-slate-100/50 
          hover:drop-shadow-md transition
          text-base text-center 
          rounded-lg 
          overflow-hidden 
          cursor-pointer 
        '
      >
        <BsPlusCircle size={24} className='text-black'/>
        Create a new notebook
      </li>
    </>
    
  )
}

export default NotebookCreateCard