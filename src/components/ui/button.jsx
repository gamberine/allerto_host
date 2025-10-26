import React from 'react';
import { cn } from '../../lib/utils.js';

const variantClasses = {
  primary: 'bg-brand-500 text-white hover:bg-brand-400',
  secondary: 'bg-slate-800/90 text-white hover:bg-slate-700/80',
  outline: 'border border-slate-700 text-white hover:bg-slate-800/70',
  ghost: 'text-slate-200 hover:bg-slate-800/60'
};

const sizeClasses = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-10 px-5 text-sm',
  lg: 'h-11 px-6 text-base',
  icon: 'h-10 w-10'
};

export const Button = React.forwardRef(
  ({ asChild = false, className, variant = 'primary', size = 'md', type, ...props }, ref) => {
    const Component = asChild ? 'span' : 'button';
    const componentProps = Component === 'button' ? { type: type ?? 'button' } : {};

    return (
      <Component
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-60',
          variantClasses[variant] || variantClasses.primary,
          sizeClasses[size] || sizeClasses.md,
          className
        )}
        {...componentProps}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
