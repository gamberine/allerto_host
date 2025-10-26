import React from 'react';
import { cn } from '../lib/utils.js';

const statusClass = {
  'Alerta emitido': 'bg-amber-500/20 text-amber-200',
  'Em análise': 'bg-sky-500/20 text-sky-200',
  Estável: 'bg-emerald-500/20 text-emerald-200',
  'Aguardando odds': 'bg-slate-700/60 text-slate-200'
};

const MonitoringList = ({ items = [] }) => {
  return (
    <section className="glass-card rounded-3xl border border-slate-800/60 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">Monitoramentos ativos</h3>
          <p className="text-sm text-slate-400">Mercados acompanhados com confiança calculada em tempo real.</p>
        </div>
        <p className="text-xs uppercase tracking-wide text-slate-500">
          Total de entradas: <span className="text-slate-200">{items.length}</span>
        </p>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-400">
            <tr className="border-b border-slate-800/60">
              <th className="pb-3 font-medium">Partida</th>
              <th className="pb-3 font-medium">Mercado</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium text-right">Confiança</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {items.map((item) => (
              <tr key={item.id} className="text-slate-300">
                <td className="py-3 text-white">{item.match}</td>
                <td className="py-3">{item.market}</td>
                <td className="py-3">
                  <span
                    className={cn(
                      'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
                      statusClass[item.status] || 'bg-slate-800 text-slate-200'
                    )}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-3 text-right">
                  <span className="font-semibold text-white">{item.confidence}%</span>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-slate-500">
                  Nenhum monitoramento ativo. Crie uma estratégia para começar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MonitoringList;
