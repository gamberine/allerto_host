import React from 'react';
import { Button } from './ui/button.jsx';

const RecentAlerts = ({ alerts = [] }) => {
  return (
    <section className="glass-card rounded-3xl border border-slate-800/60 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">Alertas recentes</h3>
          <p className="text-sm text-slate-400">Resumo dos últimos gatilhos disparados pela automação.</p>
        </div>
        <Button variant="ghost" size="sm">
          Ver histórico completo
        </Button>
      </div>
      <div className="mt-6 space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="rounded-2xl border border-slate-800/60 bg-slate-900/70 px-5 py-4 text-sm text-slate-300"
          >
            <p className="font-medium text-white">{alert.event}</p>
            <p className="mt-1 text-slate-300">{alert.detail}</p>
            <p className="mt-2 text-xs uppercase tracking-wide text-slate-500">{alert.timestamp}</p>
          </div>
        ))}
        {alerts.length === 0 && (
          <p className="rounded-2xl border border-dashed border-slate-800/70 bg-slate-900/40 px-5 py-8 text-center text-sm text-slate-400">
            Nenhum alerta emitido nas últimas horas. As condições configuradas estão estáveis.
          </p>
        )}
      </div>
    </section>
  );
};

export default RecentAlerts;
