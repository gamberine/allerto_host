import React from 'react';
import { cn } from '../../lib/utils.js';
import { Button } from './button.jsx';

const variants = {
  default: 'bg-slate-900/95 border border-slate-800/70 text-slate-100',
  success: 'bg-emerald-600/95 border border-emerald-400/40 text-white',
  info: 'bg-sky-600/95 border border-sky-400/40 text-white',
  destructive: 'bg-rose-600/95 border border-rose-400/40 text-white'
};

const Toast = ({ title, description, variant = 'default', onDismiss }) => {
  return (
    <div
      className={cn(
        'w-80 rounded-2xl px-5 py-4 shadow-2xl shadow-slate-900/50 backdrop-blur',
        variants[variant] || variants.default
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          {title && <p className="text-sm font-semibold">{title}</p>}
          {description && <p className="text-sm text-white/80">{description}</p>}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-white/70 hover:text-white"
          aria-label="Fechar notificação"
          onClick={onDismiss}
        >
          x
        </Button>
      </div>
    </div>
  );
};

export default Toast;
