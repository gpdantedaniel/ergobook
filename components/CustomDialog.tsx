import * as Dialog from '@radix-ui/react-dialog';
import { BsX, BsXCircle, BsXLg } from 'react-icons/bs';

interface CustomDialogProps extends Dialog.DialogProps {
  title: string;
  description?: string;
}

const CustomDialog: React.FC<CustomDialogProps> = (
  { title, description, ...props }
) => {
  return (
    <Dialog.Root {...props}>
      <Dialog.Portal>
        <Dialog.Overlay 
          className='
            bg-neutral-200/10 dark:bg-black/10
            backdrop-blur-sm 
            fixed inset-0
          '
        >
          <Dialog.Content 
            className='
              theme-card border
              fixed 
              drop-shadow-md 
              top-[50%] 
              left-[50%]
              w-[90vw] max-w-[450px] 
              p-6 
              translate-x-[-50%] 
              translate-y-[-50%] 
              rounded-md
              focus:outline-none
            '
          >
            <Dialog.Close className='w-full flex justify-end outline-none'>
              <BsXLg size={20} className='text-neutral-500 hover:text-neutral-700 transition cursor-pointer'/>
            </Dialog.Close>
            <Dialog.Title>
              <div className='text-lg theme-text-colors'>
                <strong>
                  { title }
                </strong>
              </div>
            </Dialog.Title>
            <Dialog.Description>
              <div className='text-base theme-text-colors-secondary mt-1 text-bold'>
                { description ? description : '' }
              </div>
              
            </Dialog.Description>
            <hr className='border-t border-neutral-400 mt-4'/>
            <div className=''>
              { props.children }
            </div>            
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default CustomDialog