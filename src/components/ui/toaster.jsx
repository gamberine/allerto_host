import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import React from 'react';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}



// import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
// import { createPortal } from 'react-dom';
// import Toast from './toast.jsx';

// const ToastContext = createContext(undefined);

// export const ToastProvider = ({ children }) => {
//   const [toasts, setToasts] = useState([]);

//   const dismiss = useCallback((id) => {
//     setToasts((prev) => prev.filter((toast) => toast.id !== id));
//   }, []);

//   const toast = useCallback(
//     ({ title, description, variant = 'default', duration = 4000 }) => {
//       const id =
//         typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
//           ? crypto.randomUUID()
//           : Math.random().toString(36).slice(2);

//       setToasts((prev) => [...prev, { id, title, description, variant }]);

//       if (duration && typeof window !== 'undefined') {
//         window.setTimeout(() => dismiss(id), duration);
//       }

//       return id;
//     },
//     [dismiss]
//   );

//   const value = useMemo(() => ({ toast, dismiss, toasts }), [toast, dismiss, toasts]);

//   return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
// };

// export const useToastContext = () => {
//   const context = useContext(ToastContext);
//   if (!context) {
//     throw new Error('useToastContext deve ser usado dentro de um ToastProvider');
//   }
//   return context;
// };

// export const Toaster = () => {
//   const { toasts, dismiss } = useToastContext();

//   if (typeof document === 'undefined') {
//     return null;
//   }

//   return createPortal(
//     <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex flex-col items-end gap-3 px-4 lg:top-6 lg:px-6">
//       {toasts.map((toastItem) => (
//         <div key={toastItem.id} className="pointer-events-auto">
//           <Toast {...toastItem} onDismiss={() => dismiss(toastItem.id)} />
//         </div>
//       ))}
//     </div>,
//     document.body
//   );
// };

// export default ToastProvider;
