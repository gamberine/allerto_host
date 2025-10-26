import React from 'react';
import { cn } from '../../lib/utils.js';

export const Label = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn('text-sm font-medium text-slate-200 peer-disabled:cursor-not-allowed peer-disabled:opacity-60', className)}
      {...props}
    />
  );
});

Label.displayName = 'Label';
