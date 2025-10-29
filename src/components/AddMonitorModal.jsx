import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  SatelliteDish,
  ClipboardList,
  CheckSquare,
  TrendingUp,
  Settings,
  Link2,
  Tag,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';

const typeOptions = [
  {
    id: 'monitoramento',
    label: 'Monitoramento',
    description: 'Rastreie links e receba atualizacoes automaticas.',
    icon: SatelliteDish,
    required: true,
  },
  {
    id: 'tarefa',
    label: 'Tarefa',
    description: 'Crie acoes com lembretes e prioridades.',
    icon: ClipboardList,
  },
  {
    id: 'aposta',
    label: 'Monitorar Aposta',
    description: 'Organize entradas e sinais do seu mercado favorito.',
    icon: TrendingUp,
  },
  {
    id: 'outro',
    label: 'Outro',
    description: 'Conectividade, medicoes e fluxos especiais.',
    icon: Settings,
  },
];

const monitoringSubcategories = [
  {
    id: 'pedido',
    label: 'Pedido/Rastreio',
    hint: 'Acompanhe o status de compras e entregas sem perder nenhum movimento.',
  },
  {
    id: 'protocolo',
    label: 'Protocolo',
    hint: 'Monitore chamados, tickets e solicitacoes com retorno rapido.',
  },
  {
    id: 'sorteio',
    label: 'Sorteio',
    hint: 'Receba alertas sobre resultados e novas oportunidades.',
  },
  {
    id: 'noticia',
    label: 'Noticia',
    hint: 'Siga portais, blogs ou comunicados importantes.',
  },
];

const notificationOptions = [
  { value: 'email', label: 'E-mail' },
  { value: 'push', label: 'Push' },
  { value: 'whatsapp', label: 'WhatsApp' },
];

const priorityOptions = [
  { value: 'low', label: 'Baixa' },
  { value: 'medium', label: 'Media' },
  { value: 'high', label: 'Alta' },
];

const MAX_TAGS = 3;
const MAX_TAG_LENGTH = 8;

const initialMonitoramento = {
  subcategory: '',
  link: '',
};

const initialTaskData = {
  title: '',
  text: '',
  createReminder: false,
  date: '',
  time: '',
  notifications: [],
  priority: 'medium',
  tags: [],
};

const initialApostaData = {
  title: '',
  type: '',
};

const initialOutrosData = {
  connectivity: { ssid: '', location: '', contact: '' },
  speedUrl: '',
  pingUrl: '',
};

const createTaskId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `tarefas_${Math.random().toString(36).slice(2, 11)}`;
};

const normalizeTag = (value) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/gi, '')
    .slice(0, MAX_TAG_LENGTH)
    .toLowerCase();

const AddMonitorModal = ({ isOpen, onClose }) => {
  const [selectedType, setSelectedType] = useState('monitoramento');
  const [monitoramentoData, setMonitoramentoData] = useState(initialMonitoramento);
  const [taskData, setTaskData] = useState(initialTaskData);
  const [tagDraft, setTagDraft] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);
  const [apostaData, setApostaData] = useState(initialApostaData);
  const [outrosData, setOutrosData] = useState(initialOutrosData);

  const resetStates = () => {
    setSelectedType('monitoramento');
    setMonitoramentoData(initialMonitoramento);
    setTaskData(initialTaskData);
    setTagDraft('');
    setShowTagInput(false);
    setApostaData(initialApostaData);
    setOutrosData(initialOutrosData);
  };

  const closeModal = () => {
    resetStates();
    onClose();
  };

  const saveMonitor = (monitor) => {
    try {
      const stored = JSON.parse(localStorage.getItem('allerto_monitors') || '[]');
      stored.unshift(monitor);
      localStorage.setItem('allerto_monitors', JSON.stringify(stored));
      window.dispatchEvent(new CustomEvent('monitoring:refresh'));
    } catch (error) {
      console.warn('Erro ao salvar monitoramento', error);
    }
  };

  const handleCreateMonitoramento = () => {
    if (!monitoramentoData.subcategory) {
      toast({
        title: 'Escolha uma categoria',
        description: 'Selecione o que deseja monitorar antes de continuar.',
        variant: 'destructive',
      });
      return;
    }

    if (!monitoramentoData.link.trim()) {
      toast({
        title: 'Link obrigatorio',
        description: 'Informe o link que deseja acompanhar.',
        variant: 'destructive',
      });
      return;
    }

    const subcategory = monitoringSubcategories.find(
      (item) => item.id === monitoramentoData.subcategory,
    );

    const newMonitor = {
      id: Date.now().toString(),
      name: subcategory?.label ?? 'Monitoramento',
      type: 'monitoramento',
      subcategory: monitoramentoData.subcategory,
      link: monitoramentoData.link.trim(),
      key: monitoramentoData.link.trim(),
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    saveMonitor(newMonitor);

    toast({
      title: 'Monitoramento configurado',
      description: `Estamos acompanhando ${subcategory?.label ?? 'o link selecionado'}.`,
    });

    resetStates();
    onClose();
  };

  const handleCreateTask = () => {
    const title = taskData.title.trim();
    if (!title) {
      toast({
        title: 'Informe um titulo',
        description: 'De nome a tarefa para organiza-la na sua lista.',
        variant: 'destructive',
      });
      return;
    }

    if (taskData.createReminder && !taskData.date) {
      toast({
        title: 'Complete o lembrete',
        description: 'Defina uma data para o lembrete antes de salvar.',
        variant: 'destructive',
      });
      return;
    }

    const newTask = {
      id: createTaskId(),
      title,
      notes: taskData.text.trim() || undefined,
      due: taskData.date || undefined,
      dueTime: taskData.time || undefined,
      reminder: taskData.createReminder,
      notifications: taskData.notifications,
      tags: taskData.tags,
      priority: taskData.priority,
      completed: false,
      createdAt: Date.now(),
    };

    try {
      const tasks = JSON.parse(localStorage.getItem('allerto_tarefas_tasks') || '[]');
      tasks.unshift(newTask);
      localStorage.setItem('allerto_tarefas_tasks', JSON.stringify(tasks));
      window.dispatchEvent(new CustomEvent('tarefas:refresh'));
    } catch (error) {
      console.warn('Erro ao salvar tarefa', error);
    }

    toast({
      title: 'Tarefa criada',
      description: `"${newTask.title}" adicionada a sua central de tarefas.`,
    });

    resetStates();
    onClose();
  };

  const toggleNotification = (value) => {
    setTaskData((state) => {
      const isSelected = state.notifications.includes(value);
      const notifications = isSelected
        ? state.notifications.filter((item) => item !== value)
        : [...state.notifications, value];
      return { ...state, notifications };
    });
  };

  const handleAddTag = () => {
    const formatted = normalizeTag(tagDraft);
    if (!formatted) {
      return;
    }

    if (taskData.tags.includes(formatted)) {
      toast({
        title: 'Tag repetida',
        description: 'Use palavras diferentes para identificar a tarefa.',
      });
      setTagDraft('');
      return;
    }

    if (taskData.tags.length >= MAX_TAGS) {
      toast({
        title: 'Limite de tags',
        description: `Voce pode usar ate ${MAX_TAGS} tags por tarefa.`,
        variant: 'destructive',
      });
      return;
    }

    setTaskData((state) => ({
      ...state,
      tags: [...state.tags, formatted],
    }));
    setTagDraft('');
  };

  const handleRemoveTag = (tag) => {
    setTaskData((state) => ({
      ...state,
      tags: state.tags.filter((item) => item !== tag),
    }));
  };

  const handleGenerateSmartTags = () => {
    const base = `${taskData.title} ${taskData.text}`.trim();
    if (!base) {
      return;
    }

    const cleaned = base
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/gi, ' ')
      .toLowerCase();

    const candidates = Array.from(new Set(cleaned.split(/\s+/).filter((word) => word.length >= 4)));

    if (candidates.length === 0) {
      toast({
        title: 'Sem sugestoes',
        description: 'Use um texto maior para gerar tags inteligentes.',
      });
      return;
    }

    const suggestions = candidates.slice(0, MAX_TAGS);
    setTaskData((state) => ({
      ...state,
      tags: suggestions,
    }));
  };

  const handleRegisterConnectivity = () => {
    const { ssid, location, contact } = outrosData.connectivity;
    if (!ssid.trim() || !location.trim()) {
      toast({
        title: 'Complete os dados',
        description: 'Informe ao menos o nome da rede e o local.',
        variant: 'destructive',
      });
      return;
    }

    const newMonitor = {
      id: Date.now().toString(),
      name: `Conectividade - ${ssid.trim()}`,
      type: 'outro',
      category: 'conectividade',
      key: ssid.trim(),
      status: 'active',
      createdAt: new Date().toISOString(),
      details: {
        location: location.trim(),
        contact: contact.trim() || undefined,
      },
    };

    saveMonitor(newMonitor);

    toast({
      title: 'Conectividade cadastrada',
      description: `Estamos acompanhando a rede ${ssid.trim()}.`,
    });

    setOutrosData((state) => ({
      ...state,
      connectivity: { ssid: '', location: '', contact: '' },
    }));
  };

  const handleStartSpeedTest = () => {
    if (!outrosData.speedUrl.trim()) {
      toast({
        title: 'Informe o endereco',
        description: 'Defina uma URL para iniciar a medicao de velocidade.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Medicao iniciada',
      description: 'Vamos preparar um relatorio de velocidade. Recurso em construcao.',
    });

    setOutrosData((state) => ({ ...state, speedUrl: '' }));
  };

  const handleStartPing = () => {
    if (!outrosData.pingUrl.trim()) {
      toast({
        title: 'Informe o endereco',
        description: 'Defina uma URL para monitorar o ping.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Monitorando ping',
      description: 'Medicoes continuas serao exibidas em breve.',
    });

    setOutrosData((state) => ({ ...state, pingUrl: '' }));
  };

  const canGenerateTags = taskData.title.trim() && taskData.text.trim();
  const tagLimitReached = taskData.tags.length >= MAX_TAGS;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            class="fixed top-[5%] inset-0 flex justify-center z-50 p-4 mx-auto overflow-hidden transform-none max-w-[92%] sm:max-w-3xl lg:max-w-4xl lg:max-h-[88%] h-auto"


          >
            <div className="glass-effect rounded-2xl p-6 lg:p-8 border border-white/15 shadow-xl">
              <div className="flex items-start justify-between gap-4 mb-8">
                <div>
                  <p className="text-sm uppercase tracking-wide text-blue-200/60">
                    Central de criacao
                  </p>
                  <h2 className="text-3xl font-semibold text-white leading-tight">
                    Adicionar Novo
                  </h2>
                  <p className="text-sm text-blue-200/70 mt-2 max-w-lg">
                    Escolha o que deseja criar e deixe que o Allerto organize os proximos passos para voce.
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeModal}
                  className="hover:bg-white/10 text-blue-100"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <section className="space-y-6 rounded-2xl overflow-y-auto h-auto max-h-[76%]">
                <div>
                  <Label className="text-sm text-blue-100/80 mb-3 block">
                    Vamos criar...
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {typeOptions.map((option) => {
                      const Icon = option.icon;
                      const isActive = selectedType === option.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setSelectedType(option.id)}
                          className={`flex flex-col items-start gap-3 rounded-xl border px-4 py-4 text-left transition-all ${isActive
                            ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                            : 'border-white/10 bg-white/5 hover:bg-white/10'
                            }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="rounded-lg bg-white/10 p-2 text-primary">
                              <Icon className="w-5 h-5" />
                            </span>
                            {option.required && (
                              <span className="text-[10px] uppercase tracking-wide text-primary">
                                obrigatorio
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">{option.label}</p>
                            <p className="text-xs text-blue-200/70 leading-relaxed">
                              {option.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
                {selectedType === 'monitoramento' && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 space-y-6"
                  >
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-white flex items-center gap-2">
                        <SatelliteDish className="w-4 h-4 text-primary" />
                        Monitoramento inteligente
                      </p>
                      <p className="text-sm text-blue-200/70">
                        Defina o tipo de acompanhamento e compartilhe o link que deseja rastrear.
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {monitoringSubcategories.map((subcategory) => {
                        const isActive = monitoramentoData.subcategory === subcategory.id;
                        return (
                          <button
                            key={subcategory.id}
                            type="button"
                            onClick={() =>
                              setMonitoramentoData((state) => ({
                                ...state,
                                subcategory: subcategory.id,
                              }))
                            }
                            className={`flex flex-col gap-2 rounded-xl border px-4 py-4 text-left transition ${isActive
                              ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                              : 'border-white/10 bg-white/5 hover:bg-white/10'
                              }`}
                          >
                            <span className="text-sm font-medium text-white">
                              {subcategory.label}
                            </span>
                            <span className="text-xs text-blue-200/70 leading-relaxed">
                              {subcategory.hint}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="monitor-link" className="text-sm text-blue-100/80">
                        Insira o link que deseja rastrear *
                      </Label>
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <div className="relative flex-1">
                          <Link2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-200/60" />
                          <Input
                            id="monitor-link"
                            value={monitoramentoData.link}
                            onChange={(event) =>
                              setMonitoramentoData((state) => ({
                                ...state,
                                link: event.target.value,
                              }))
                            }
                            placeholder="https://"
                            className="bg-white/5 border-white/10 pl-9 text-white placeholder:text-blue-200/40"
                          />
                        </div>
                        <Button
                          type="button"
                          onClick={handleCreateMonitoramento}
                          className="bg-gradient-to-r from-primary to-orange-500 text-white shadow-lg shadow-primary/30"
                        >
                          Ativar monitoramento
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {selectedType === 'tarefa' && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 space-y-6"
                  >
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-white flex items-center gap-2">
                        <CheckSquare className="w-4 h-4 text-primary" />
                        Centro de tarefas
                      </p>
                      <p className="text-sm text-blue-200/70">
                        Use descricoes claras, tags e lembretes para manter o foco.
                      </p>
                    </div>

                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="task-title" className="text-sm text-blue-100/80">
                          Titulo *
                        </Label>
                        <Input
                          id="task-title"
                          value={taskData.title}
                          onChange={(event) =>
                            setTaskData((state) => ({ ...state, title: event.target.value }))
                          }
                          placeholder="Ex.: Preparar relatorio semanal"
                          className="bg-white/5 border-white/10 text-white placeholder:text-blue-200/40"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="task-text" className="text-sm text-blue-100/80">
                          Texto
                        </Label>
                        <textarea
                          id="task-text"
                          value={taskData.text}
                          onChange={(event) =>
                            setTaskData((state) => ({ ...state, text: event.target.value }))
                          }
                          rows={4}
                          placeholder="Detalhe como executar, links uteis ou checklist rapido."
                          className="resize-none rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-blue-200/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>

                      <div className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-4">
                        <label className="flex items-center gap-3 text-sm text-white">
                          <Checkbox
                            checked={taskData.createReminder}
                            onCheckedChange={(checked) =>
                              setTaskData((state) => ({
                                ...state,
                                createReminder: Boolean(checked),
                                date: checked ? state.date : '',
                                time: checked ? state.time : '',
                                notifications: checked ? state.notifications : [],
                              }))
                            }
                          />
                          Criar lembrete?
                        </label>

                        {taskData.createReminder && (
                          <div className="grid gap-4 sm:grid-cols-3">
                            <div className="space-y-2">
                              <Label htmlFor="task-date" className="text-xs text-blue-100/70">
                                Data
                              </Label>
                              <Input
                                id="task-date"
                                type="date"
                                value={taskData.date}
                                onChange={(event) =>
                                  setTaskData((state) => ({ ...state, date: event.target.value }))
                                }
                                className="bg-white/5 border-white/10 text-white"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="task-time" className="text-xs text-blue-100/70">
                                Horario
                              </Label>
                              <Input
                                id="task-time"
                                type="time"
                                value={taskData.time}
                                onChange={(event) =>
                                  setTaskData((state) => ({ ...state, time: event.target.value }))
                                }
                                className="bg-white/5 border-white/10 text-white"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-xs text-blue-100/70">Notificacao</Label>
                              <div className="space-y-2">
                                {notificationOptions.map((option) => (
                                  <label
                                    key={option.value}
                                    className="flex items-center gap-3 text-xs text-blue-100/80"
                                  >
                                    <Checkbox
                                      checked={taskData.notifications.includes(option.value)}
                                      onCheckedChange={() => toggleNotification(option.value)}
                                    />
                                    {option.label}
                                  </label>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm text-blue-100/80 flex items-center gap-2">
                          <Tag className="w-4 h-4 text-primary" />
                          Tags
                        </Label>
                        <div className="flex flex-wrap items-center gap-2">
                          {taskData.tags.map((tag) => (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs text-primary hover:bg-primary/20"
                            >
                              #{tag}
                            </button>
                          ))}

                          {!tagLimitReached && showTagInput && (
                            <div className="flex items-center gap-2">
                              <Input
                                value={tagDraft}
                                maxLength={MAX_TAG_LENGTH}
                                onChange={(event) => setTagDraft(event.target.value)}
                                onKeyDown={(event) => {
                                  if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleAddTag();
                                  }
                                }}
                                placeholder="ate 8 caracteres"
                                className="h-9 w-32 bg-white/5 border-white/10 text-sm text-white placeholder:text-blue-200/40"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                onClick={handleAddTag}
                                className="h-9 px-3 text-primary hover:bg-primary/10"
                              >
                                Adicionar
                              </Button>
                            </div>
                          )}

                          {!tagLimitReached && (
                            <Button
                              type="button"
                              variant="ghost"
                              onClick={() => setShowTagInput((value) => !value)}
                              className="h-9 w-9 rounded-full border border-white/10 bg-white/5 text-blue-200 hover:text-white"
                            >
                              <Tag className="w-4 h-4" />
                            </Button>
                          )}

                          <Button
                            type="button"
                            variant="ghost"
                            disabled={!canGenerateTags}
                            onClick={handleGenerateSmartTags}
                            className="h-9 rounded-full border border-white/10 bg-white/5 text-blue-200 hover:text-white disabled:opacity-50"
                          >
                            <Sparkles className="w-4 h-4 mr-2 text-primary" />
                            Gerar tags inteligentes
                          </Button>
                        </div>
                        <p className="text-xs text-blue-200/60">
                          Limite de {MAX_TAGS} tags por tarefa. Clique em uma tag para remove-la.
                        </p>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label className="text-sm text-blue-100/80">Prioridade</Label>
                          <select
                            value={taskData.priority}
                            onChange={(event) =>
                              setTaskData((state) => ({ ...state, priority: event.target.value }))
                            }
                            className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                          >
                            {priorityOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex flex-col justify-end gap-2">
                          <Button
                            type="button"
                            onClick={handleCreateTask}
                            className="bg-gradient-to-r from-primary to-orange-500 text-white shadow-lg shadow-primary/30"
                          >
                            Concluir tarefa
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {selectedType === 'aposta' && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-5 sm:p-6 space-y-5"
                  >
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-white flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-amber-300" />
                        Monitorar aposta
                      </p>
                      <p className="text-sm text-amber-100/80">
                        Estamos preparando uma experiencia completa para acompanhar entradas, odds e alertas personalizados.
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="bet-title" className="text-sm text-amber-100/80">
                          Titulo
                        </Label>
                        <Input
                          id="bet-title"
                          value={apostaData.title}
                          onChange={(event) =>
                            setApostaData((state) => ({ ...state, title: event.target.value }))
                          }
                          placeholder="Ex.: Entrada Over 2.5"
                          className="bg-white/10 border-white/20 text-white placeholder:text-amber-100/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bet-type" className="text-sm text-amber-100/80">
                          Tipo
                        </Label>
                        <Input
                          id="bet-type"
                          value={apostaData.type}
                          onChange={(event) =>
                            setApostaData((state) => ({ ...state, type: event.target.value }))
                          }
                          placeholder="Mercado, liga ou referente"
                          className="bg-white/10 border-white/20 text-white placeholder:text-amber-100/50"
                        />
                      </div>
                    </div>

                    <p className="text-xs text-amber-100/70">
                      Em construcao... compartilhe com a equipe quais indicadores voce gostaria de ver aqui.
                    </p>

                    <Button
                      type="button"
                      variant="ghost"
                      disabled
                      className="w-full justify-center border border-white/20 text-amber-100/80 opacity-70"
                    >
                      Novidades em breve
                    </Button>
                  </motion.div>
                )}

                {selectedType === 'outro' && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 space-y-6"
                  >
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-white flex items-center gap-2">
                        <Settings className="w-4 h-4 text-primary" />
                        Experimentos e integracoes
                      </p>
                      <p className="text-sm text-blue-200/70">
                        Atalhos para monitorar conectividade, velocidade e disponibilidade de sites.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-4">
                        <div>
                          <p className="text-sm font-semibold text-white">Conexao / Wi-Fi</p>
                          <p className="text-xs text-blue-200/70">
                            Mantenha a qualidade da rede sempre sob controle.
                          </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
                            <div>
                              <p className="text-xs font-semibold text-white tracking-wide uppercase">
                                Monitorar conectividade
                              </p>
                              <p className="text-xs text-blue-200/70">
                                Cadastre as redes criticas da operacao e receba alertas de estabilidade.
                              </p>
                            </div>
                            <div className="space-y-2">
                              <Input
                                value={outrosData.connectivity.ssid}
                                onChange={(event) =>
                                  setOutrosData((state) => ({
                                    ...state,
                                    connectivity: {
                                      ...state.connectivity,
                                      ssid: event.target.value,
                                    },
                                  }))
                                }
                                placeholder="Nome da rede (SSID)"
                                className="bg-white/5 border-white/10 text-white placeholder:text-blue-200/40"
                              />
                              <Input
                                value={outrosData.connectivity.location}
                                onChange={(event) =>
                                  setOutrosData((state) => ({
                                    ...state,
                                    connectivity: {
                                      ...state.connectivity,
                                      location: event.target.value,
                                    },
                                  }))
                                }
                                placeholder="Local / ambiente"
                                className="bg-white/5 border-white/10 text-white placeholder:text-blue-200/40"
                              />
                              <Input
                                value={outrosData.connectivity.contact}
                                onChange={(event) =>
                                  setOutrosData((state) => ({
                                    ...state,
                                    connectivity: {
                                      ...state.connectivity,
                                      contact: event.target.value,
                                    },
                                  }))
                                }
                                placeholder="Responsavel (opcional)"
                                className="bg-white/5 border-white/10 text-white placeholder:text-blue-200/40"
                              />
                            </div>
                            <Button
                              type="button"
                              onClick={handleRegisterConnectivity}
                              className="w-full bg-gradient-to-r from-primary to-orange-500 text-white"
                            >
                              Cadastrar
                            </Button>
                          </div>

                          <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-4">
                            <div>
                              <p className="text-xs font-semibold text-white tracking-wide uppercase">
                                Medir velocidade
                              </p>
                              <p className="text-xs text-blue-200/70">
                                Verifique respostas de APIs ou urls essenciais em tempo real.
                              </p>
                            </div>
                            <Input
                              value={outrosData.speedUrl}
                              onChange={(event) =>
                                setOutrosData((state) => ({
                                  ...state,
                                  speedUrl: event.target.value,
                                }))
                              }
                              placeholder="https://"
                              className="bg-white/5 border-white/10 text-white placeholder:text-blue-200/40"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={handleStartSpeedTest}
                              className="border-primary/60 text-primary hover:bg-primary/10"
                            >
                              Iniciar
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
                        <div>
                          <p className="text-sm font-semibold text-white">Medicao de ping</p>
                          <p className="text-xs text-blue-200/70">
                            Acompanhe a disponibilidade de servicos essenciais com testes recorrentes.
                          </p>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row">
                          <Input
                            value={outrosData.pingUrl}
                            onChange={(event) =>
                              setOutrosData((state) => ({
                                ...state,
                                pingUrl: event.target.value,
                              }))
                            }
                            placeholder="https://"
                            className="bg-white/5 border-white/10 text-white placeholder:text-blue-200/40"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleStartPing}
                            className="border-primary/60 text-primary hover:bg-primary/10"
                          >
                            Iniciar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddMonitorModal;
