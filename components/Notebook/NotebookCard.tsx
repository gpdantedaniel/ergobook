'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ColorItem, NotebookType } from "@/types"

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as AlertDialog from '@radix-ui/react-alert-dialog'

import { useForm, SubmitHandler } from "react-hook-form"
import toast from 'react-hot-toast'

import { BsPencil, BsTrash, BsThreeDotsVertical, BsGripHorizontal, BsGripVertical, BsGrid3X2Gap } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { AppDispatch } from "@/redux/notebooksStore"
import { updateNotebook, deleteNotebook } from "@/redux/notebooksSlice"

import { useSortable } from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

import CustomDialog from "../CustomDialog"
import Input from "../Input"
import ColorDropdown from "../ColorDropdown"
import CustomAlert from "../CustomAlert"

interface NotebookCardProps {
  notebook: NotebookType,
}

type NotebookInputs = {
  title: string
  color: ColorItem
}

const NotebookCard: React.FC<NotebookCardProps> = ({ notebook }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({id: notebook.id});

  // Edit Notebook dialog state controls
  const [editOpen, setEditOpen] = useState<boolean>(false)
  const [editLoading, setEditLoading] = useState<boolean>(false)

  // Alert Notebook dialog state controls
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false)
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)

  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const { register, handleSubmit, setValue, watch } = 
  useForm<NotebookInputs>({
    defaultValues: {
      title: notebook.title,
      color: {
        name: 'Current color', // Find the name by hex code
        hex: notebook.color
      }
    }
  })
  
  const openNotebook = () => {
    router.push(`/workspace/notebook/${notebook.id}`)
  }

  const onUpdateNotebook: SubmitHandler<NotebookInputs> = (formData) => {
    // Disable the form while updating the notebook
    setEditLoading(true)

    const update = dispatch(updateNotebook({
      id: notebook?.id,
      title: formData.title,
      color: formData.color.hex
    }))

    update
    .then(() => setEditOpen(false))
    .catch((error) => console.log('error: ', error))
    .finally(() => setEditLoading(false))

    toast.promise(update, {
      loading: 'Updating notebook...',
      success: 'Notebook successfully updated!',
      error: 'Failed to update notebook.'
    })
  }

  const onDeleteNotebook = () => {
    // Disable the form while deleting the notebook
    setDeleteLoading(true)

    const deletion = dispatch(deleteNotebook({
      id: notebook?.id
    }))

    deletion
    .then(() => setDeleteOpen(false))
    .catch((error) => console.log('error: ', error))
    .finally(() => setDeleteLoading(false))

    toast.promise(deletion, {
      loading: 'Deleting notebook...',
      success: 'Notebook successfully deleted!',
      error: 'Failed to delete notebook.'
    })
  }

  return (
    <>
      <CustomDialog
        title='Edit Notebook'
        description='Give your notebook a personality!'
        onOpenChange={(open) => setEditOpen(open)}
        open={editOpen}
      >
        <form onSubmit={handleSubmit(onUpdateNotebook)}>
          <div className='my-6 flex flex-col gap-2'>
            <label className='text-sm'>Notebook Title</label>
            <Input
              placeholder='Title'
              disabled={editLoading}
              {...register('title')}
            />
            <label className='text-sm'>Notebook Color</label>
            <ColorDropdown 
              disabled={editLoading}
              selectedColor={ watch('color')} 
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
            disabled={editLoading}
          />
        </form>
      </CustomDialog>
      
      <CustomAlert
        title='Delete Notebook'
        description='Are you sure you want to delete this notebook?'
        onOpenChange={(open) => setDeleteOpen(open)}
        open={deleteOpen}
        actionLabel='Delete'
        onAction={onDeleteNotebook}
        disabled={deleteLoading}
      />      

      <li
        onClick={openNotebook} 
        className='
          border-2 border-slate-200 md:border-none
          w-full md:w-48 md:h-64
          flex-shrink-0
          active:opacity-90
          rounded-lg
          overflow-hidden
          cursor-pointer
          flex md:block
          justify-end
          group'
        ref={setNodeRef}
        style={{ 
          backgroundColor: notebook.color,
          transform: CSS.Transform.toString(transform),
          transition
        }}
        {...attributes}
      >
        <div className='
          h-full md:h-1/3
          w-11/12 md:w-full
          py-4 px-4 pr-2         
          flex justify-start items-start
        bg-white md:bg-[#212529]
         md:group-hover:bg-[#171a1c] transition'
        >
          <div className="
          text-black md:text-white md:group-hover:text-primary-dark
            flex-1 text-base line-clamp-2"
          >
            {notebook?.title}
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <DropdownMenu.Root >
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  collisionPadding={16}
                  className='
                    md:max-w-[250px] p-3
                    flex flex-col gap-1
                    bg-white text-black
                    border border-slate-300
                    rounded-lg 
                    drop-shadow-md 
                  '
                >
                  <DropdownMenu.Item onSelect={() => setEditOpen(true)} className='outline-none'>
                    <div className='flex gap-5 items-center justify-between cursor-pointer hover:bg-[#93E9BE]/50 transition rounded-md p-1 px-2'>
                      Edit Notebook
                      <BsPencil size={20}/>
                    </div>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item onSelect={() => setDeleteOpen(true) } className='outline-none'>
                    <div className='flex gap-5 items-center justify-between cursor-pointer hover:bg-[#93E9BE]/50 transition rounded-md p-1 px-2'>
                      Delete Notebook
                      <BsTrash size={20}/>
                    </div>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
              <DropdownMenu.Trigger className='outline-none'>
                <div className='bg-transparent rounded-full hover:bg-slate-200/20 transition p-1'>
                  <BsThreeDotsVertical size={20} className='
                  text-black md:text-white'/>
                </div>
              </DropdownMenu.Trigger>       
            </DropdownMenu.Root>     
          </div>
        </div>
        <div className='flex md:h-2/3 justify-center items-end'>
          <div
            onClick={(e) => e.stopPropagation()}
            {...listeners} 
            className='
              hidden md:block
              bg-transparent 
              rounded-full 
             hover:bg-white/50 
              transition 
              p-2
              my-2
              hover:cursor-grab
              active:cursor-grabbing
              active:bg-white/50 
            '
          >
            <BsGripHorizontal size={26} className='text-black'/>
          </div>
        </div>
      </li>
    </>
  )
}

export default NotebookCard

/*
inline-block
opacity-0
group-hover:opacity-100
*/