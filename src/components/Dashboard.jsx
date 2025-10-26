// import React, { useState } from 'react';
// import AddMonitorModal from './AddMonitorModal.jsx';
// import BettingDashboard from './BettingDashboard.jsx';
// import CallToAction from './CallToAction.jsx';
// import Header from './Header.jsx';
// import WelcomeMessage from './WelcomeMessage.jsx';

// const Dashboard = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   return (
//     <div className="space-y-10">
//       <Header onAddMonitor={openModal} />
//       <WelcomeMessage />
//       <CallToAction onAddMonitor={openModal} />
//       <BettingDashboard />
//       <AddMonitorModal open={isModalOpen} onClose={closeModal} />
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, TrendingUp, Wifi, Activity, AlertCircle, CheckCircle } from 'lucide-react';
import StatCard from '@/components/StatCard';
import RecentAlerts from '@/components/RecentAlerts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    activeMonitors: 0,
    todayAlerts: 0,
    pendingItems: 0,
    connectionStatus: 'online'
  });

  useEffect(() => {
    const monitors = JSON.parse(localStorage.getItem('allerto_monitors') || '[]');
    const alerts = JSON.parse(localStorage.getItem('allerto_alerts') || '[]');

    const today = new Date().toDateString();
    const todayAlerts = alerts.filter(alert =>
      new Date(alert.timestamp).toDateString() === today
    );

    setStats({
      activeMonitors: monitors.length,
      todayAlerts: todayAlerts.length,
      pendingItems: monitors.filter(m => m.status === 'pending').length,
      connectionStatus: 'online'
    });
  }, []);

  const statCards = [
    {
      title: 'Monitores Ativos',
      value: stats.activeMonitors,
      icon: Activity,
      color: 'from-primary to-orange-500',
      trend: '+12%'
    },
    {
      title: 'Alertas Hoje',
      value: stats.todayAlerts,
      icon: AlertCircle,
      color: 'from-secondary to-cyan-600',
      trend: '+5'
    },
    {
      title: 'Itens Pendentes',
      value: stats.pendingItems,
      icon: Package,
      color: 'from-amber-500 to-orange-500',
      trend: '-3'
    },
    {
      title: 'Conexão',
      value: stats.connectionStatus === 'online' ? 'Online' : 'Offline',
      icon: Wifi,
      color: 'from-green-500 to-emerald-500',
      trend: '100%'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentAlerts />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-effect rounded-2xl p-6 card-hover"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            Status do Sistema
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-sm text-blue-200/80">Sincronização</span>
              <span className="text-sm font-medium text-green-400">Ativa</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-sm text-blue-200/80">Notificações</span>
              <span className="text-sm font-medium text-green-400">Habilitadas</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-sm text-blue-200/80">Última Atualização</span>
              <span className="text-sm font-medium text-blue-200">Agora</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;