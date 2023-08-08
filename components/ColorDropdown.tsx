import { ColorItem } from '@/types';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { twMerge } from 'tailwind-merge'

const ColorDropdown = ({ 
    onSelectColor, 
    selectedColor,
    disabled
  } : { 
    onSelectColor: (color: ColorItem) => void, 
    selectedColor: ColorItem, 
    disabled: boolean 
  }
) => {
  // Should be moved to a constants file
  const colors = [
    { name: 'Burnt Sienna', hex: '#E97451' },
    { name: 'Soft Peach', hex: '#F5D3B6' },
    { name: 'Sage Green', hex: '#88B493' },
    { name: 'Moss Green', hex: '#5A7D5A' },
    { name: 'Deep Ocean', hex: '#315668' },
    { name: 'Powder Blue', hex: '#A2D5F2' },
    { name: 'Muted Lavender', hex: '#A89BB9' },
    { name: 'Warm Taupe', hex: '#BAA892' },
    { name: 'Rich Chocolate', hex: '#5C342E' },
    { name: 'Brick Red', hex: '#C62D42'},
    { name: 'Terracotta', hex: '#D9661F' },
    { name: 'Midnight Blue', hex: '#17223B' },
    { name: 'Dusty Rose', hex: '#D3A5A5' },
    { name: 'Emerald', hex: '#0F4C5C' },
    { name: 'Salmon', hex: '#FF8C69' },
    { name: 'Slate Gray', hex: '#5E6367' },
  ];

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        disabled={disabled} 
        className={twMerge(`
          flex
          w-full
          rounded-md
          px-3 py-3
          text-sm
          focus:outline-none
          focus:drop-shadow-sm
          border-2
        focus:border-primary-light
        border-neutral-200
          gap-2
          items-center`,

          disabled && `
          cursor-not-allowed
          opacity-50
          `
        )}
      >
        <div 
          className="block w-4 h-4 rounded-full" 
          style={{ backgroundColor: selectedColor.hex }}>
        </div>
        { selectedColor.name }
      </DropdownMenu.Trigger>
    
      <DropdownMenu.Portal>
        <DropdownMenu.Content className='
          max-h-[300px] 
          overflow-y-auto 
          bg-white
          text-black 
          fixed 
          flex-col 
          p-2 
          rounded-lg
          drop-shadow-md 
          border 
          border-neutral-300 
          min-w-[220px]'
        >
          {colors.map((color, i) => (
            <DropdownMenu.Item 
              key={i} 
              onSelect={() => onSelectColor(color)} 
              className='flex gap-2 py-1 px-2 items-center hover:bg-primary-light/50 transition rounded-md cursor-pointer'
            >
              <div
                className="block w-4 h-4 rounded-full "
                style={{ backgroundColor: color.hex }}
              ></div>
              <span className='text-base'>{color.name}</span>
              
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default ColorDropdown