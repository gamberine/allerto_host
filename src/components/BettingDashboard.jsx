import React, { useMemo } from 'react';
import MonitoringList from './MonitoringList.jsx';
import NotificationSettings from './NotificationSettings.jsx';
import RecentAlerts from './RecentAlerts.jsx';
import StatCard from './StatCard.jsx';

const BettingDashboard = () => {
  const stats = useMemo(
    () => [
      {
        title: 'Mercados monitorados',
        value: '18',
        trend: '+3 nesta semana',
        icon: '🎯'
      },
      {
        title: 'Alertas enviados',
        value: '124',
        trend: '92% de precisão',
        icon: '⚡'
      },
      {
        title: 'ROI médio',
        value: '18.6%',
        trend: 'baseado nos últimos 30 dias',
        icon: '📈'
      }
    ],
    []
  );

  const alerts = useMemo(
    () => [
      {
        id: 1,
        event: 'Premier League - Arsenal x Liverpool',
        detail: 'Mercado de escanteios atingiu 9.5 com odd 1.72',
        timestamp: 'há 3 minutos'
      },
      {
        id: 2,
        event: 'NBA - Lakers x Warriors',
        detail: 'Back Moneyline Lakers em 2.05 após sequência de 8 pontos',
        timestamp: 'há 12 minutos'
      },
      {
        id: 3,
        event: 'Brasileirão - Bahia x Grêmio',
        detail: 'Linha de gols asiáticos ajustada para 2.0 @ 1.90',
        timestamp: 'há 28 minutos'
      }
    ],
    []
  );

  const monitoredMarkets = useMemo(
    () => [
      {
        id: 1,
        match: 'Corinthians x Palmeiras',
        market: 'Total de gols asiáticos',
        status: 'Em análise',
        confidence: 78
      },
      {
        id: 2,
        match: 'Real Madrid x Barcelona',
        market: 'Handicap -1.5',
        status: 'Alerta emitido',
        confidence: 91
      },
      {
        id: 3,
        match: 'PSG x Marseille',
        market: 'Ambas equipes marcam',
        status: 'Estável',
        confidence: 64
      },
      {
        id: 4,
        match: 'Denver Nuggets x Boston Celtics',
        market: 'Total de pontos 2º quarto',
        status: 'Aguardando odds',
        confidence: 55
      }
    ],
    []
  );

  const channels = useMemo(
    () => [
      {
        id: 'email',
        label: 'Resumo diário por e-mail',
        description: 'Receba um compilado com os principais alertas e métricas do dia.',
        enabled: true
      },
      {
        id: 'telegram',
        label: 'Canal no Telegram',
        description: 'Alertas instantâneos com odds e recomendações em tempo real.',
        enabled: true
      },
      {
        id: 'sms',
        label: 'SMS prioritário',
        description: 'Notificações para oportunidades acima de 85% de confiança.',
        enabled: false
      }
    ],
    []
  );

  return (
    <section className="space-y-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <RecentAlerts alerts={alerts} />
          <MonitoringList items={monitoredMarkets} />
        </div>
        <NotificationSettings channels={channels} />
      </div>
    </section>
  );
};

export default BettingDashboard;
