import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Smartphone, MessageSquare, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";

const NotificationSettings = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState({
    email: true,
    push: true,
    sms: false,
    whatsapp: false,
    sound: true,
  });

  useEffect(() => {
    const stored = localStorage.getItem("allerto_notification_settings");
    if (stored) {
      setSettings(JSON.parse(stored));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem(
      "allerto_notification_settings",
      JSON.stringify(settings)
    );
    toast({
      title: "Configurações salvas!",
      description: "Suas preferências de notificação foram atualizadas.",
    });
    onClose();
  };

  const channels = [
    { id: "email", label: "E-mail", icon: Mail },
    { id: "push", label: "Push Notification", icon: Smartphone },
    { id: "sms", label: "SMS", icon: MessageSquare },
    { id: "whatsapp", label: "WhatsApp", icon: MessageSquare },
    { id: "sound", label: "Alertas Sonoros", icon: Volume2 },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Fundo escurecido */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Modal */}
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
            <div className="glass-effect rounded-2xl p-6 border border-white/20 shadow-lg">
              {/* Cabeçalho */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-red-500">
                  Configurações de Notificação
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Lista de canais */}
              <div className="space-y-4 mb-6">
                {channels.map((channel) => {
                  const Icon = channel.icon;
                  return (
                    <div
                      key={channel.id}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <Label
                          htmlFor={channel.id}
                          className="text-blue-200 cursor-pointer"
                        >
                          {channel.label}
                        </Label>
                      </div>

                      <Checkbox
                        id={channel.id}
                        checked={settings[channel.id]}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, [channel.id]: checked })
                        }
                      />
                    </div>
                  );
                })}
              </div>

              {/* Botão de salvar */}
              <Button
                onClick={handleSave}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover"
              >
                Salvar Configurações
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationSettings;
