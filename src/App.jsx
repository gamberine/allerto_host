// import React from 'react';
// import Dashboard from './components/Dashboard.jsx';
// import { ToastProvider, Toaster } from './components/ui/toaster.jsx';

// const App = () => {
//   return (
//     <ToastProvider>
//       <div className="min-h-screen bg-slate-950 bg-[radial-gradient(circle_at_top,_rgba(30,64,175,0.45),_transparent_60%)]">
//         <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-16 pt-10 sm:px-6 lg:px-8">
//           <Dashboard />
//         </div>
//       </div>
//       <Toaster />
//     </ToastProvider>
//   );
// };

// export default App;

import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Package, TrendingUp, Wifi, Activity, Plus, Settings, ClipboardList } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import MonitoringList from '@/components/MonitoringList';
import AddMonitorModal from '@/components/AddMonitorModal';
import NotificationSettings from '@/components/NotificationSettings';
import BettingDashboard from '@/components/BettingDashboard';
import Tarefas from '@/components/Tarefas';
function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const tabs = [{
    id: 'dashboard',
    label: 'Dashboard',
    icon: Activity
  }, {
    id: 'monitoring',
    label: 'Monitoramento',
    icon: Bell
  }, {
    id: 'tarefas',
    label: 'Tarefas',
    icon: ClipboardList
  }, {
    id: 'betting',
    label: 'Apostas',
    icon: TrendingUp
  }];
  return <>
    <Helmet>
      <title>Allerto - O alerta certo, no momento certo</title>
      <meta name="description" content="Central inteligente de acompanhamento e monitoramento que sincroniza atualizações importantes da sua vida digital" />
    </Helmet>

    <div className="min-h-screen pb-20">
      <Header onSettingsClick={() => setShowSettings(true)} />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="mb-8">

          <p className="text-lg text-blue-200/80">A alerta certo, no momento certo.</p>
        </motion.div>

        <div className="glass-effect rounded-2xl p-2 mb-8 flex w-full gap-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex-1 flex items-center justify-center gap-2 ${activeTab === tab.id ? 'bg-gradient-to-r from-primary to-orange-500 text-white shadow-lg' : 'text-blue-200/60 hover:text-blue-200 hover:bg-white/5'}`}>
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>;
          })}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && <motion.div key="dashboard" initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} exit={{
            opacity: 0,
            x: 20
          }} transition={{
            duration: 0.3
          }}>
            <Dashboard />
          </motion.div>}

          {activeTab === 'monitoring' && <motion.div key="monitoring" initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} exit={{
            opacity: 0,
            x: 20
          }} transition={{
            duration: 0.3
          }}>
            <MonitoringList />
          </motion.div>}

          {activeTab === 'tarefas' && <motion.div key="tarefas" initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} exit={{
            opacity: 0,
            x: 20
          }} transition={{
            duration: 0.3
          }}>
            <Tarefas />
          </motion.div>}

          {activeTab === 'betting' && <motion.div key="betting" initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} exit={{
            opacity: 0,
            x: 20
          }} transition={{
            duration: 0.3
          }}>
            <BettingDashboard />
          </motion.div>}
        </AnimatePresence>
      </main>

      <motion.button whileHover={{
        scale: 1.1
      }} whileTap={{
        scale: 0.9
      }} onClick={() => setShowAddModal(true)} className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-primary to-orange-500 rounded-full shadow-2xl shadow-primary/50 flex items-center justify-center text-white hover:shadow-primary/70 transition-shadow">
        <Plus className="w-8 h-8" />
      </motion.button>

      <AddMonitorModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />

      <NotificationSettings isOpen={showSettings} onClose={() => setShowSettings(false)} />

      <Toaster />
    </div>
  </>;
}
export default App;
