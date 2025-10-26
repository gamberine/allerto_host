import React from 'react';
import { cn } from '../lib/utils.js';

const StatCard = ({ title, value, trend, icon }) => {
  return (
    <article className="glass-card flex h-full flex-col justify-between rounded-3xl p-6">
      <div className="flex items-start justify-between">
        <span className="text-sm font-medium text-slate-400">{title}</span>
        <span className="text-2xl">{icon}</span>
      </div>
      <div className="mt-6 space-y-3">
        <p className="text-4xl font-semibold text-white">{value}</p>
        <p className={cn('text-sm', trend?.includes('-') ? 'text-rose-300' : 'text-emerald-300')}>{trend}</p>
      </div>
    </article>
  );
};

export default StatCard;
