import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, TrendingUp, Wifi, Activity, Trash2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const MonitoringList = () => {
  const [monitors, setMonitors] = useState([]);

  useEffect(() => {
    loadMonitors();
  }, []);

  const loadMonitors = () => {
    const storedMonitors = JSON.parse(localStorage.getItem('allerto_monitors') || '[]');
    setMonitors(storedMonitors);
  };

  const deleteMonitor = (id) => {
    const updatedMonitors = monitors.filter(m => m.id !== id);
    localStorage.setItem('allerto_monitors', JSON.stringify(updatedMonitors));
    setMonitors(updatedMonitors);

    toast({
      title: "Monitor removido",
      description: "O monitoramento foi removido com sucesso.",
    });
  };

  const refreshMonitor = (id) => {
    toast({
      title: "Atualizando...",
      description: "🚧 Esta funcionalidade ainda não está implementada—mas não se preocupe! Você pode solicitá-la no próximo prompt! 🚀",
    });
  };

  const getIcon = (type) => {
    switch (type) {
      case 'package': return Package;
      case 'betting': return TrendingUp;
      case 'connection': return Wifi;
      default: return Activity;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'pending': return 'text-yellow-400';
      case 'completed': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  if (monitors.length === 0) {
    return (
      <div className="glass-effect rounded-2xl p-12 text-center">
        <Activity className="w-16 h-16 text-primary/50 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">Nenhum monitor ativo</h3>
        <p className="text-blue-200/60 mb-6">
          Clique no botão + para adicionar seu primeiro monitoramento
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Meus Monitoramentos</h2>
        <span className="text-sm text-blue-200/60">{monitors.length} ativos</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {monitors.map((monitor, index) => {
          const Icon = getIcon(monitor.type);

          return (
            <motion.div
              key={monitor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-effect rounded-2xl p-6 card-hover"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium">{monitor.name}</h3>
                    <p className={`text-xs ${getStatusColor(monitor.status)}`}>
                      {monitor.status}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="text-sm">
                  <span className="text-blue-200/60">Tipo: </span>
                  <span className="text-blue-200">{monitor.type}</span>
                </div>
                <div className="text-sm">
                  <span className="text-blue-200/60">Chave: </span>
                  <span className="text-blue-200 font-mono text-xs">{monitor.key}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => refreshMonitor(monitor.id)}
                  className="flex-1 hover:bg-white/10"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Atualizar
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteMonitor(monitor.id)}
                  className="hover:bg-red-500/20 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default MonitoringList;

// import React from 'react';
// import { cn } from '../lib/utils.js';

// const statusClass = {
//   'Alerta emitido': 'bg-amber-500/20 text-amber-200',
//   'Em análise': 'bg-sky-500/20 text-sky-200',
//   Estável: 'bg-emerald-500/20 text-emerald-200',
//   'Aguardando odds': 'bg-slate-700/60 text-slate-200'
// };

// const MonitoringList = ({ items = [] }) => {
//   return (
//     <section className="glass-card rounded-3xl border border-slate-800/60 p-6">
//       <div className="flex flex-wrap items-center justify-between gap-3">
//         <div>
//           <h3 className="text-lg font-semibold text-white">Monitoramentos ativos</h3>
//           <p className="text-sm text-slate-400">Mercados acompanhados com confiança calculada em tempo real.</p>
//         </div>
//         <p className="text-xs uppercase tracking-wide text-slate-500">
//           Total de entradas: <span className="text-slate-200">{items.length}</span>
//         </p>
//       </div>

//       <div className="mt-6 overflow-x-auto">
//         <table className="w-full min-w-[560px] text-left text-sm">
//           <thead className="text-xs uppercase tracking-wide text-slate-400">
//             <tr className="border-b border-slate-800/60">
//               <th className="pb-3 font-medium">Partida</th>
//               <th className="pb-3 font-medium">Mercado</th>
//               <th className="pb-3 font-medium">Status</th>
//               <th className="pb-3 font-medium text-right">Confiança</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-slate-800/60">
//             {items.map((item) => (
//               <tr key={item.id} className="text-slate-300">
//                 <td className="py-3 text-white">{item.match}</td>
//                 <td className="py-3">{item.market}</td>
//                 <td className="py-3">
//                   <span
//                     className={cn(
//                       'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
//                       statusClass[item.status] || 'bg-slate-800 text-slate-200'
//                     )}
//                   >
//                     {item.status}
//                   </span>
//                 </td>
//                 <td className="py-3 text-right">
//                   <span className="font-semibold text-white">{item.confidence}%</span>
//                 </td>
//               </tr>
//             ))}
//             {items.length === 0 && (
//               <tr>
//                 <td colSpan={4} className="py-8 text-center text-slate-500">
//                   Nenhum monitoramento ativo. Crie uma estratégia para começar.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </section>
//   );
// };

// export default MonitoringList;
