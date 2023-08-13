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
        <AlertDialog.Overlay 
          className='
          bg-neutral-200/10 dark:bg-black/10
          backdrop-blur-sm 
          fixed inset-0
          '
        />
        <AlertDialog.Content
          className='
            theme-card border
            fixed 
            drop-shadow-md 
            top-[50%] 
            left-[50%] 
            w-[90vw] max-w-[450px] 
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
            <div className='text-base theme-text-colors-secondary mt-1 text-bold'>
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
                
                bg-red-400
                text-black 
                justify-center 
                border-none 
                hover:drop-shadow-md 
                active:opacity-90
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
                theme-secondary-card border
                justify-center 
                hover:drop-shadow-sm 
                active:opacity-90
                cursor-pointer
                font-bold
              '
            >
              Cancel
            </AlertDialog.Cancel>
          </div>
          

        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}

export default CustomAlert