import { ReactNode } from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

export const Label = ({ children, ...props }: LabelProps) => {
  return (
    <label {...props} className="block text-gray-700 text-sm font-bold mb-2">
      {children}
    </label>
  );
};