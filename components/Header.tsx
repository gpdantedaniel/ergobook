"use client";

import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import ThemeButton from "./ThemeButton";

const Header = () => {
  return (
    <div
      className="
        theme-background-glass
        theme-border border-b
        w-full h-16         
        sticky top-0 z-20 flex-shrink-0
        flex justify-center  
      "
    >
      <div
        className="
          theme-text-colors
          w-full md:w-10/12 
          px-4 md:px-0 
          flex items-center gap-3 md:gap-0 justify-between
        "
      >
        <div className="font-source-serif text-2xl flex items-center gap-2">
          <AiOutlineMenu size={22} className="block md:hidden" />
          Ergobook
        </div>
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="hidden md:flex items-center gap-3 text-base">
            generic@email.com
            <BsPersonCircle size={22} />
          </div>
          <ThemeButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
