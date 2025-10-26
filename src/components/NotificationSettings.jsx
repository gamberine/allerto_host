import React, { useEffect, useMemo, useState } from 'react';
import { Button } from './ui/button.jsx';
import { Checkbox } from './ui/checkbox.jsx';
import { Label } from './ui/label.jsx';
import { useToast } from './ui/use-toast.js';

const NotificationSettings = ({ channels = [] }) => {
  const defaultState = useMemo(() => {
    return channels.reduce((accumulator, channel) => {
      accumulator[channel.id] = Boolean(channel.enabled);
      return accumulator;
    }, {});
  }, [channels]);

  const [preferences, setPreferences] = useState(defaultState);

  useEffect(() => {
    setPreferences(defaultState);
  }, [defaultState]);
  const { toast } = useToast();

  const toggleChannel = (id) => {
    setPreferences((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = () => {
    toast({
      title: 'Preferências atualizadas',
      description: 'Seus canais de notificação foram sincronizados com sucesso.',
      variant: 'success'
    });
  };

  return (
    <aside className="glass-card flex h-full flex-col rounded-3xl border border-slate-800/60 p-6">
      <div>
        <h3 className="text-lg font-semibold text-white">Notificações</h3>
        <p className="text-sm text-slate-400">
          Ajuste como a equipe deve receber alertas priorizados e relatórios estratégicos.
        </p>
      </div>
      <div className="mt-6 flex-1 space-y-5">
        {channels.map((channel) => (
          <div key={channel.id} className="space-y-2 rounded-2xl border border-slate-800/60 bg-slate-900/60 p-4">
            <div className="flex items-start gap-3">
              <Checkbox
                id={channel.id}
                checked={Boolean(preferences[channel.id])}
                onChange={() => toggleChannel(channel.id)}
              />
              <div>
                <Label htmlFor={channel.id} className="text-base text-white">
                  {channel.label}
                </Label>
                <p className="text-sm text-slate-400">{channel.description}</p>
              </div>
            </div>
          </div>
        ))}
        {channels.length === 0 && (
          <p className="rounded-2xl border border-dashed border-slate-800/60 px-4 py-8 text-center text-sm text-slate-500">
            Nenhum canal configurado. Adicione canais para distribuir alertas com mais eficiência.
          </p>
        )}
      </div>
      <div className="mt-6 flex flex-col gap-3 text-xs text-slate-500">
        <Button onClick={handleSave}>Salvar preferências</Button>
        <p>
          Última alteração manual <span className="text-slate-300">há 2 dias</span> - Logs disponíveis no painel
          administrativo.
        </p>
      </div>
    </aside>
  );
};

export default NotificationSettings;
