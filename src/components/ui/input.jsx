import React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export { Input };

// import React from 'react';
// import { cn } from '../../lib/utils.js';

// export const Input = React.forwardRef(({ className, type = 'text', ...props }, ref) => {
//   return (
//     <input
//       ref={ref}
//       type={type}
//       className={cn(
//         'h-11 w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 text-sm text-white shadow-inner shadow-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60',
//         className
//       )}
//       {...props}
//     />
//   );
// });

// Input.displayName = 'Input';
