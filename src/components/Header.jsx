import React from 'react';
import { Button } from './ui/button.jsx';

const Header = ({ onAddMonitor }) => {
  return (
    <header className="flex flex-wrap items-center justify-between gap-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand-200">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500/20 text-xl text-brand-200">
            AH
          </span>
          Allerto Host
        </div>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">Painel de monitoramento inteligente</h1>
        <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
          Tenha visibilidade completa dos mercados esportivos, automatize gatilhos personalizados e entregue alertas
          de alta qualidade aos seus clientes.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs text-emerald-200">
          Uptime em tempo real: 99.982%
        </div>
        <Button size="lg" onClick={onAddMonitor}>
          + Novo monitoramento
        </Button>
      </div>
    </header>
  );
};

export default Header;
