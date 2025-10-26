import React from 'react';
import { cn } from '../../lib/utils.js';

export const Checkbox = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type="checkbox"
      className={cn(
        'peer h-5 w-5 rounded-md border border-slate-600 bg-slate-900 text-brand-400 ring-offset-slate-950 transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
        className
      )}
      {...props}
    />
  );
});

Checkbox.displayName = 'Checkbox';
