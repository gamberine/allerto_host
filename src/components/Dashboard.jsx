import React, { useState } from 'react';
import AddMonitorModal from './AddMonitorModal.jsx';
import BettingDashboard from './BettingDashboard.jsx';
import CallToAction from './CallToAction.jsx';
import Header from './Header.jsx';
import WelcomeMessage from './WelcomeMessage.jsx';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="space-y-10">
      <Header onAddMonitor={openModal} />
      <WelcomeMessage />
      <CallToAction onAddMonitor={openModal} />
      <BettingDashboard />
      <AddMonitorModal open={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Dashboard;
