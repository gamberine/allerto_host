import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, TrendingUp, Wifi, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

const AddMonitorModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'package',
    key: '',
  });

  const monitorTypes = [
    { id: 'package', label: 'Pedido/Rastreio', icon: Package },
    { id: 'betting', label: 'Aposta Esportiva', icon: TrendingUp },
    { id: 'connection', label: 'Conexão/Wi-Fi', icon: Wifi },
    { id: 'other', label: 'Outro', icon: Activity },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.key) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para continuar.",
        variant: "destructive",
      });
      return;
    }

    const newMonitor = {
      id: Date.now().toString(),
      ...formData,
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    const monitors = JSON.parse(localStorage.getItem('allerto_monitors') || '[]');
    monitors.push(newMonitor);
    localStorage.setItem('allerto_monitors', JSON.stringify(monitors));

    const newAlert = {
      id: Date.now().toString(),
      type: formData.type,
      title: 'Novo monitor adicionado',
      message: `${formData.name} está sendo monitorado`,
      timestamp: new Date().toISOString(),
    };

    const alerts = JSON.parse(localStorage.getItem('allerto_alerts') || '[]');
    alerts.unshift(newAlert);
    localStorage.setItem('allerto_alerts', JSON.stringify(alerts));

    toast({
      title: "Monitor adicionado!",
      description: "O monitoramento foi configurado com sucesso.",
    });

    setFormData({ name: '', type: 'package', key: '' });
    onClose();
    window.location.reload();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="
              fixed 
              left-0 sm:left-0 lg:left-1/2 
              top-[2dvh] lg:top-0 
              -translate-x-0 lg:-translate-x-1/2 
              -translate-y-0 lg:-translate-y-1/2 
              w-full max-w-[80dvw] sm:max-w-[70dvw] lg:max-w-md xl:max-w-lg 
              z-50 p-4
            "
          >
            <div className="glass-effect rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold gradient-text">Add Novo Monitoramento</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-blue-200 mb-2 block">
                    Nome do Monitoramento
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Pedido Amazon #12345"
                    className="bg-white/5 border-white/10 text-white placeholder:text-blue-200/40"
                  />
                </div>

                <div>
                  <Label className="text-blue-200 mb-3 block">Tipo de Monitoramento</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {monitorTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, type: type.id })}
                          className={`p-4 rounded-xl border-2 transition-all ${formData.type === type.id
                            ? 'border-primary bg-primary/20'
                            : 'border-white/10 bg-white/5 hover:bg-white/10'
                            }`}
                        >
                          <Icon className="w-6 h-6 mx-auto mb-2" />
                          <span className="text-sm">{type.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <Label htmlFor="key" className="text-blue-200 mb-2 block">
                    Chave de Identificação
                  </Label>
                  <Input
                    id="key"
                    value={formData.key}
                    onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                    placeholder="Ex: BR123456789BR ou CPF"
                    className="bg-white/5 border-white/10 text-white placeholder:text-blue-200/40"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover"
                >
                  Adicionar Monitoramento
                </Button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddMonitorModal;
