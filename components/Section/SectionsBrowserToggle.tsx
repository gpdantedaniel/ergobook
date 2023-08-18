import React, { forwardRef } from "react";
import { BsLayoutSidebar } from "react-icons/bs";

const SectionsBrowserToggle = ({ onClick }: { onClick: Function }) => {
  return (
    <button
      onClick={() => onClick()}
      className="
      theme-selectable-background
      theme-border border
      p-2 rounded-md
      theme-text-colors
      hover:theme-background-hover
      cursor-pointer
      "
    >
      <BsLayoutSidebar size={18} />
    </button>
  );
};

export default SectionsBrowserToggle;
