import React, { useState } from 'react';
import { Button } from './ui/button.jsx';
import { Input } from './ui/input.jsx';
import { Label } from './ui/label.jsx';
import { useToast } from './ui/use-toast.js';

const createInitialState = () => ({
  match: '',
  market: '',
  threshold: ''
});

const AddMonitorModal = ({ open, onClose }) => {
  const [formState, setFormState] = useState(() => createInitialState());
  const { toast } = useToast();

  if (!open) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    toast({
      title: 'Monitor criado',
      description: `Agora acompanhando ${formState.match || 'um novo evento esportivo'}.`,
      variant: 'success'
    });
    setFormState(createInitialState());
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/80 px-4 py-10">
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-800/70 bg-slate-900/95 p-8 shadow-2xl">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h3 className="text-2xl font-semibold text-white">Adicionar monitoramento</h3>
            <p className="mt-2 text-sm text-slate-300">
              Defina os parâmetros para acompanhar em tempo real um novo mercado ou partida.
            </p>
          </div>
          <Button type="button" variant="ghost" size="icon" aria-label="Fechar" onClick={onClose}>
            x
          </Button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="match">Partida ou evento</Label>
            <Input
              id="match"
              name="match"
              placeholder="Ex.: Corinthians x Palmeiras"
              value={formState.match}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="market">Mercado</Label>
            <Input
              id="market"
              name="market"
              placeholder="Ex.: Ambas marcam, total de gols..."
              value={formState.market}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="threshold">Trigger desejado</Label>
            <Input
              id="threshold"
              name="threshold"
              placeholder="Ex.: Probabilidade maior que 65%"
              value={formState.threshold}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Criar monitoramento</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMonitorModal;
