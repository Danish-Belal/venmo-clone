import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string; // Optional className prop for custom styling
}

export const Button = ({ onClick, children, className = "" }: ButtonProps) => {
  return (
    <button 
      onClick={onClick} 
      type="button" 
      className={`${className}`}>
      {children}
    </button>
  );
};
