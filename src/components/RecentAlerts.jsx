import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Package, TrendingUp, Wifi, Clock } from 'lucide-react';

const RecentAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const storedAlerts = JSON.parse(localStorage.getItem('allerto_alerts') || '[]');
    setAlerts(storedAlerts.slice(0, 5));
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'package': return Package;
      case 'betting': return TrendingUp;
      case 'connection': return Wifi;
      default: return Bell;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'package': return 'from-primary to-orange-500';
      case 'betting': return 'from-secondary to-cyan-600';
      case 'connection': return 'from-green-500 to-emerald-500';
      default: return 'from-amber-500 to-orange-500';
    }
  };

  if (alerts.length === 0) {
    return (
      <div className="glass-effect rounded-2xl p-8 text-center">
        <Bell className="w-12 h-12 text-blue-400/50 mx-auto mb-4" />
        <p className="text-blue-200/60">Nenhum alerta recente</p>
      </div>
    );
  }

  return (
    <div className="glass-effect rounded-2xl p-6">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Bell className="w-5 h-5 text-primary" />
        Alertas Recentes
      </h3>

      <div className="space-y-3">
        {alerts.map((alert, index) => {
          const Icon = getIcon(alert.type);
          const color = getColor(alert.type);

          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-medium mb-1">{alert.title}</h4>
                  <p className="text-sm text-blue-200/60 mb-2">{alert.message}</p>
                  <div className="flex items-center gap-2 text-xs text-blue-200/40">
                    <Clock className="w-3 h-3" />
                    {new Date(alert.timestamp).toLocaleString('pt-BR')}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentAlerts;

// import React from 'react';
// import { Button } from './ui/button.jsx';

// const RecentAlerts = ({ alerts = [] }) => {
//   return (
//     <section className="glass-card rounded-3xl border border-slate-800/60 p-6">
//       <div className="flex flex-wrap items-center justify-between gap-3">
//         <div>
//           <h3 className="text-lg font-semibold text-white">Alertas recentes</h3>
//           <p className="text-sm text-slate-400">Resumo dos últimos gatilhos disparados pela automação.</p>
//         </div>
//         <Button variant="ghost" size="sm">
//           Ver histórico completo
//         </Button>
//       </div>
//       <div className="mt-6 space-y-4">
//         {alerts.map((alert) => (
//           <div
//             key={alert.id}
//             className="rounded-2xl border border-slate-800/60 bg-slate-900/70 px-5 py-4 text-sm text-slate-300"
//           >
//             <p className="font-medium text-white">{alert.event}</p>
//             <p className="mt-1 text-slate-300">{alert.detail}</p>
//             <p className="mt-2 text-xs uppercase tracking-wide text-slate-500">{alert.timestamp}</p>
//           </div>
//         ))}
//         {alerts.length === 0 && (
//           <p className="rounded-2xl border border-dashed border-slate-800/70 bg-slate-900/40 px-5 py-8 text-center text-sm text-slate-400">
//             Nenhum alerta emitido nas últimas horas. As condições configuradas estão estáveis.
//           </p>
//         )}
//       </div>
//     </section>
//   );
// };

// export default RecentAlerts;
