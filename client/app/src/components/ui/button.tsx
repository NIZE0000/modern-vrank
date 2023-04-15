import { useTheme } from "next-themes";
import { MouseEventHandler, ReactNode, useEffect, useState } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string
  onClick?: MouseEventHandler
};

const Button = ({ children, className, onClick }: ButtonProps) => {


  return (
    <button
      className={`hoverEffect flex items-center justify-center xl:justify-start text-lg space-x-2 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
