import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Target, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const BettingDashboard = () => {
  const [bets, setBets] = useState([]);
  const [stats, setStats] = useState({
    totalBets: 0,
    wins: 0,
    losses: 0,
    profit: 0,
  });

  useEffect(() => {
    loadBets();
  }, []);

  const loadBets = () => {
    const monitors = JSON.parse(localStorage.getItem('allerto_monitors') || '[]');
    const bettingMonitors = monitors.filter(m => m.type === 'betting');
    setBets(bettingMonitors);

    const mockStats = {
      totalBets: bettingMonitors.length,
      wins: Math.floor(bettingMonitors.length * 0.6),
      losses: Math.floor(bettingMonitors.length * 0.4),
      profit: 1250.50,
    };
    setStats(mockStats);
  };

  const addBet = () => {
    toast({
      title: "Adicionar Aposta",
      description: "🚧 Esta funcionalidade ainda não está implementada—mas não se preocupe! Você pode solicitá-la no próximo prompt! 🚀",
    });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-2xl p-6 card-hover"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-sm text-blue-200/60 mb-1">Total de Apostas</h3>
          <p className="text-3xl font-bold">{stats.totalBets}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-effect rounded-2xl p-6 card-hover"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-sm text-blue-200/60 mb-1">Vitórias</h3>
          <p className="text-3xl font-bold text-green-400">{stats.wins}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-2xl p-6 card-hover"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-sm text-blue-200/60 mb-1">Derrotas</h3>
          <p className="text-3xl font-bold text-red-400">{stats.losses}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-effect rounded-2xl p-6 card-hover"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-sm text-blue-200/60 mb-1">Lucro Total</h3>
          <p className="text-3xl font-bold text-teal-400">R$ {stats.profit.toFixed(2)}</p>
        </motion.div>
      </div>

      <div className="glass-effect rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Apostas Ativas</h3>
          <Button
            onClick={addBet}
            className="bg-gradient-to-r from-primary to-secondary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Aposta
          </Button>
        </div>

        {bets.length === 0 ? (
          <div className="text-center py-12">
            <TrendingUp className="w-16 h-16 text-primary/50 mx-auto mb-4" />
            <p className="text-blue-200/60">Nenhuma aposta ativa</p>
          </div>
        ) : (
          <div className="space-y-3">
            {bets.map((bet, index) => (
              <motion.div
                key={bet.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium mb-1">{bet.name}</h4>
                    <p className="text-sm text-blue-200/60">ID: {bet.key}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-blue-200/60">Status</span>
                    <p className="font-medium text-yellow-400">{bet.status}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BettingDashboard;