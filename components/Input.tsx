import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, disabled, ...props }, ref) => {
    return (
      <input
        type={type}
        disabled={disabled}
        ref={ref}
        className={twMerge(
          `
        flex
        w-full
        rounded-md
        px-3 py-3
        text-sm
        file:border-0
        file:transparent
        file:text-sm
        file:font-medium
        disabled:cursor-not-allowed
        disabled:opacity-50
        focus:outline-none
        focus:drop-shadow-sm
        theme-border border
        bg-white
        dark:bg-neutral-900
        focus:border-primary-light
        placeholder:text-neutral-500`,

          type === "submit" &&
            `
        bg-primary-dark dark:bg-primary-dark
        text-black 
        justify-center 
        border-none 
        hover:drop-shadow-md 
        hover:opacity-90
        cursor-pointer
        font-bold`,

          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
