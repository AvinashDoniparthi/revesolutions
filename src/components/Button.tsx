import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { ArrowRight, type LucideIcon } from 'lucide-react';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: LucideIcon;
  showArrow?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon: Icon,
  showArrow = false,
  onClick,
  type = 'button',
  className = '',
  ...motionProps
}) => {
  const baseStyles = 'group inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0066D6]/40 disabled:opacity-50 disabled:cursor-not-allowed select-none tracking-normal';

  const sizeStyles = {
    sm: 'px-4 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
  };

  const variantStyles = {
    primary: 'bg-[#0066D6] hover:bg-[#0054B3] text-white shadow-md shadow-[#0066D6]/20',
    secondary: 'bg-[#EAF3FD] hover:bg-[#D5E7FC] text-[#0C172B]',
    outline: 'bg-white hover:bg-[#F0F5FA] text-[#0C172B] border border-[#CADDF4] shadow-xs',
    ghost: 'bg-transparent text-[#0066D6] hover:underline p-0',
    white: 'bg-white hover:bg-[#F0F6FF] text-[#0066D6] shadow-xl border border-white',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...motionProps}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span className="relative z-10">{children}</span>
      {showArrow && (
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 relative z-10" />
      )}
    </motion.button>
  );
};
export default Button;
