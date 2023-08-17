import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

type DropdownAction = {
  name: string;
  icon: React.ReactNode;
  onClick: () => void;
};

interface CustomDropdownProps extends DropdownMenu.DropdownMenuProps {
  dropdownActions: DropdownAction[];
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ ...props }) => {
  return (
    <DropdownMenu.Root {...props}>
      <DropdownMenu.Trigger className="outline-none">
        {props.children}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          collisionPadding={16}
          className="
            md:max-w-[250px] p-3
            flex flex-col gap-1
            theme-card border
            theme-text-colors
            rounded-lg 
            drop-shadow-md
            z-40
          "
        >
          {props.dropdownActions.map((action, index) => (
            <DropdownMenu.Item
              key={index}
              onSelect={action.onClick}
              className="outline-none"
            >
              <div className="flex gap-5 items-center justify-between cursor-pointer hover:bg-[#93E9BE]/50 dark:hover:bg-neutral-800 transition rounded-md p-1 px-2">
                {action.name}
                {action.icon}
              </div>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default CustomDropdown;
