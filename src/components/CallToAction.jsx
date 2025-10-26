import React from 'react';
import HeroImage from './HeroImage.jsx';
import { Button } from './ui/button.jsx';
import { useToast } from './ui/use-toast.js';

const CallToAction = ({ onAddMonitor }) => {
  const { toast } = useToast();

  const handleCreateMonitor = () => {
    toast({
      title: 'Configuração guiada',
      description: 'Vamos abrir o assistente para montar um novo monitoramento em segundos.',
      variant: 'info'
    });
    onAddMonitor?.();
  };

  return (
    <section className="glass-card overflow-hidden rounded-3xl border border-slate-800/70">
      <div className="grid gap-10 p-10 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-3">
          <span className="inline-flex items-center rounded-full bg-brand-500/10 px-4 py-1 text-xs font-medium uppercase tracking-wide text-brand-200">
            Novidades
          </span>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Automatize alertas inteligentes para oportunidades que fazem diferença.
          </h2>
          <p className="text-base text-slate-300">
            Combine dados proprietários, leitura de mercado e regras em uma única automação. Receba alertas
            instantâneos e seja o primeiro a agir sobre movimentos vantajosos.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="lg" onClick={handleCreateMonitor}>
              Criar monitoramento guiado
            </Button>
            <Button size="lg" variant="secondary">
              Ver biblioteca de estratégias
            </Button>
          </div>
          <ul className="mt-6 grid gap-2 text-sm text-slate-400 sm:grid-cols-2">
            <li>- Estratégias pré-configuradas por esporte</li>
            <li>- Indicadores de confiança em tempo real</li>
            <li>- Notificações priorizadas por canal</li>
            <li>- Histórico e auditoria de decisões</li>
          </ul>
        </div>
        <div className="lg:col-span-2">
          <HeroImage />
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
