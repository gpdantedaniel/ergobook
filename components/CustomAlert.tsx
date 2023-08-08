import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { BsXLg } from 'react-icons/bs';

interface CustomAlertProps extends AlertDialog.DialogProps {
  title: string;
  description?: string;
  actionLabel: string;
  onAction: () => void;
  disabled: boolean;
}

const CustomAlert: React.FC<CustomAlertProps> = (
  { title, description, actionLabel, onAction, disabled, ...props }
) => {
  return (
    <AlertDialog.Root {...props}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className='bg-neutral-200/10 backdrop-blur-sm fixed inset-0'/>
        <AlertDialog.Content
          className='
          bg-white 
            fixed 
            drop-shadow-md 
            border 
          border-neutral-300 
            top-[50%] 
            left-[50%] 
            md:w-[90vw] 
            md:max-w-[450px] 
            translate-x-[-50%] 
            translate-y-[-50%] 
            rounded-md
            p-6 
            focus:outline-none
          '
        >
          <AlertDialog.Cancel className='w-full flex justify-end outline-none'>
            <BsXLg size={20} className='text-neutral-500 hover:text-neutral-700 transition cursor-pointer'/>
          </AlertDialog.Cancel>
          <AlertDialog.Title>
            <div className='text-lg'>
              <strong>
                { title }
              </strong>
            </div>
          </AlertDialog.Title>
          <AlertDialog.Description>
            <div className='text-base text-neutral-700 mt-1 text-bold'>
              { description ? description : '' }
            </div>
          </AlertDialog.Description>
          <div className='flex my-4 gap-4'>
            <AlertDialog.Action
              onClick={onAction}
              className='
                flex
                w-full
                rounded-md
                px-2 py-2
                text-sm
                
                bg-red-500
                text-black 
                justify-center 
                border-none 
                hover:drop-shadow-md 
                hover:opacity-90
                cursor-pointer
                font-bold
              '
            >
                { actionLabel }
            </AlertDialog.Action>
            <AlertDialog.Cancel
              className='
                flex
                w-full
                rounded-md
                px-2 py-2
                text-sm

                bg-white
                border 
                border-neutral-400 
                justify-center 
                hover:drop-shadow-md 
                hover:opacity-90
                cursor-pointer
                font-bold
              '
            >
              <strong>
                Cancel
              </strong>
            </AlertDialog.Cancel>
          </div>
          

        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}

export default CustomAlert