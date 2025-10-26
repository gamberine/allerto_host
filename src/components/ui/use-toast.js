import { useToastContext } from './toaster.jsx';

export const useToast = () => {
  const context = useToastContext();
  return {
    toast: context.toast,
    dismiss: context.dismiss
  };
};
