import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { ArrowRight, type LucideIcon } from 'lucide-react';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
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
  const baseStyles = 'group inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0071E3]/40 disabled:opacity-50 disabled:cursor-not-allowed select-none tracking-normal';

  const sizeStyles = {
    sm: 'px-4 py-1.5 text-xs gap-1.5 font-medium',
    md: 'px-5 py-2.5 text-sm gap-2 font-medium',
    lg: 'px-6 py-3 text-base gap-2 font-medium',
  };

  const variantStyles = {
    primary: 'bg-[#0071E3] hover:bg-[#0077ED] text-white shadow-xs',
    secondary: 'bg-[#E8E8ED] hover:bg-[#DEDEE3] text-[#1D1D1F]',
    outline: 'bg-white hover:bg-gray-50 text-[#1D1D1F] border border-black/15 shadow-xs',
    ghost: 'bg-transparent text-[#0066CC] hover:underline p-0',
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
      <span>{children}</span>
      {showArrow && (
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
      )}
    </motion.button>
  );
};
