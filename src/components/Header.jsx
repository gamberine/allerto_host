import React from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/images/logo.png'; // ou caminho relativo ../assets/logo.png
const Header = ({
  onSettingsClick
}) => {
  return <motion.header initial={{
    y: -100
  }} animate={{
    y: 0
  }} className="glass-effect border-b border-white/10 sticky top-0 z-50">
    <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center p-0 overflow-hidden">
          <img src={logo} alt="Allerto Logo" className="w-full h-full object-cover" data-edit-id="src/components/Header.jsx:16:13" />
        </div>
        <span className="text-xl font-bold gradient-text">Allerto - O alerta certo, no momento certo</span>
      </div>

      <Button variant="ghost" size="icon" onClick={onSettingsClick} className="hover:bg-white/10">
        <Settings className="w-5 h-5" />
      </Button>
    </div>
  </motion.header>;
};
export default Header;