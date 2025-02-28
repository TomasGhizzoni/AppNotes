import { ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'default' | 'outline' | 'secondary' | 'destructive';
}

export const Button = ({ children, variant = 'default', ...props }: ButtonProps) => {
  const baseStyle = "py-2 px-4 rounded focus:outline-none focus:shadow-outline";
  const variants = {
    default: "bg-blue-500 text-white hover:bg-blue-700",
    outline: "border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
    secondary: "bg-gray-500 text-white hover:bg-gray-700",
    destructive: "bg-red-500 text-white hover:bg-red-700",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
};