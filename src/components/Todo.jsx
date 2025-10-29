import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Filter,
  ListTodo,
  Search,
  Tag,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';

const STORAGE_KEY = 'allerto_todo_tasks';

const filterOptions = [
  { value: 'all', label: 'Todas' },
  { value: 'active', label: 'Ativas' },
  { value: 'completed', label: 'Concluídas' },
  { value: 'today', label: 'Hoje' },
  { value: 'overdue', label: 'Atrasadas' },
];

const priorityOptions = [
  { value: 'low', label: 'Baixa' },
  { value: 'medium', label: 'Média' },
  { value: 'high', label: 'Alta' },
];

const createId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `todo_${Math.random().toString(36).slice(2, 11)}`;
};

const loadTasks = () => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch (error) {
    console.warn('Erro ao carregar tarefas salvas', error);
    return [];
  }
};

const priorityBadgeClasses = {
  low: 'bg-emerald-500/10 text-emerald-200 border border-emerald-500/20',
  medium: 'bg-amber-500/10 text-amber-200 border border-amber-500/20',
  high: 'bg-rose-500/10 text-rose-200 border border-rose-500/20',
};

const normalizeTags = (raw) =>
  raw
    .split(',')
    .map((tag) => tag.replace(/^#/, '').trim())
    .filter(Boolean);

const formatTag = (tag) => `#${tag}`;

const Todo = () => {
  const [tasks, setTasks] = useState(() => loadTasks());
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [tagFilter, setTagFilter] = useState(null);
  const [draft, setDraft] = useState({
    title: '',
    notes: '',
    due: '',
    tags: '',
    priority: 'medium',
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const todayISO = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const overdue = tasks.filter(
      (task) => !task.completed && task.due && task.due < todayISO,
    ).length;

    return {
      total,
      active: total - completed,
      completed,
      overdue,
      completionRate: total === 0 ? 0 : Math.round((completed / total) * 100),
    };
  }, [tasks, todayISO]);

  const availableTags = useMemo(() => {
    const tags = new Set();
    tasks.forEach((task) => {
      (task.tags ?? []).forEach((tag) => tags.add(tag));
    });
    return Array.from(tags);
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    const searchQuery = search.trim().toLowerCase();

    return tasks.filter((task) => {
      if (filter === 'active' && task.completed) return false;
      if (filter === 'completed' && !task.completed) return false;
      if (filter === 'today' && task.due !== todayISO) return false;
      if (
        filter === 'overdue' &&
        (task.completed || !task.due || task.due >= todayISO)
      )
        return false;
      if (tagFilter && !task.tags?.includes(tagFilter)) return false;
      if (!searchQuery) return true;

      const matchesTitle = task.title.toLowerCase().includes(searchQuery);
      const matchesNotes = task.notes?.toLowerCase().includes(searchQuery);
      const matchesTags = task.tags?.some((tag) =>
        tag.toLowerCase().includes(searchQuery),
      );

      return matchesTitle || matchesNotes || matchesTags;
    });
  }, [tasks, filter, tagFilter, search, todayISO]);

  const handleAddTask = (event) => {
    event.preventDefault();
    const title = draft.title.trim();

    if (!title) {
      toast({
        title: 'Adicione um título',
        description:
          'Uma tarefa precisa de um nome para ficar registrada na sua lista.',
      });
      return;
    }

    const task = {
      id: createId(),
      title,
      notes: draft.notes.trim() || undefined,
      due: draft.due || undefined,
      tags: normalizeTags(draft.tags),
      priority: draft.priority,
      completed: false,
      createdAt: Date.now(),
    };

    setTasks((prev) => [task, ...prev]);
    setDraft({
      title: '',
      notes: '',
      due: '',
      tags: '',
      priority: draft.priority,
    });

    toast({
      title: 'Tarefa criada',
      description: `“${task.title}” adicionada à sua lista.`,
    });
  };

  const toggleTask = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const removeTask = (taskId) => {
    const task = tasks.find((item) => item.id === taskId);

    setTasks((prev) => prev.filter((item) => item.id !== taskId));

    if (task) {
      toast({
        title: 'Tarefa removida',
        description: `“${task.title}” foi excluída da lista.`,
      });
    }
  };

  const clearCompleted = () => {
    const activeTasks = tasks.filter((task) => !task.completed);

    if (activeTasks.length === tasks.length) {
      toast({
        title: 'Nada a limpar',
        description: 'Nenhuma tarefa concluída encontrada.',
      });
      return;
    }

    setTasks(activeTasks);
    toast({
      title: 'Lista organizada',
      description: 'Tarefas concluídas foram arquivadas com sucesso.',
    });
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-2xl p-6 flex items-center justify-between border border-white/10"
      >
        <div>
          <h2 className="text-2xl font-semibold text-white">Quadro de tarefas</h2>
          <p className="text-sm text-blue-200/70">
            Centralize entregas, pendências e lembretes em um só lugar.
          </p>
        </div>
        <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-orange-500 text-white shadow-lg shadow-primary/30">
          <ListTodo className="h-6 w-6" />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={<ClipboardList className="h-5 w-5" />}
          label="Total"
          value={stats.total}
        />
        <StatCard
          icon={<CheckCircle2 className="h-5 w-5" />}
          label="Concluídas"
          value={stats.completed}
          accent="text-emerald-300"
        />
        <StatCard
          icon={<Filter className="h-5 w-5" />}
          label="Ativas"
          value={stats.active}
        />
        <StatCard
          icon={<CalendarDays className="h-5 w-5" />}
          label="Atrasadas"
          value={stats.overdue}
          accent="text-rose-300"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
        <div className="space-y-6">
          <motion.form
            onSubmit={handleAddTask}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect rounded-2xl p-6 space-y-4 border border-white/10"
          >
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1">
                <label className="text-xs uppercase tracking-wide text-blue-200/60 mb-2 block">
                  Título
                </label>
                <Input
                  value={draft.title}
                  onChange={(event) =>
                    setDraft((state) => ({
                      ...state,
                      title: event.target.value,
                    }))
                  }
                  placeholder="O que precisa ser feito?"
                  className="bg-white/5 border-white/10 text-white placeholder:text-blue-200/50"
                />
              </div>
              <div className="w-full md:w-auto md:max-w-[240px]">
                <label className="text-xs uppercase tracking-wide text-blue-200/60 mb-2 block">
                  Prazo
                </label>
                <Input
                  type="date"
                  value={draft.due}
                  onChange={(event) =>
                    setDraft((state) => ({
                      ...state,
                      due: event.target.value,
                    }))
                  }
                  className="bg-white/5 border-white/10 text-white placeholder:text-blue-200/50"
                />
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="md:col-span-2">
                <label className="text-xs uppercase tracking-wide text-blue-200/60 mb-2 block">
                  Tags
                </label>
                <Input
                  value={draft.tags}
                  onChange={(event) =>
                    setDraft((state) => ({
                      ...state,
                      tags: event.target.value,
                    }))
                  }
                  placeholder="Separe as tags com vírgula"
                  className="bg-white/5 border-white/10 text-white placeholder:text-blue-200/50"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide text-blue-200/60 mb-2 block">
                  Prioridade
                </label>
                <select
                  value={draft.priority}
                  onChange={(event) =>
                    setDraft((state) => ({
                      ...state,
                      priority: event.target.value,
                    }))
                  }
                  className="h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 text-sm text-blue-50/90 focus:outline-none focus:ring-2 focus:ring-primary/60"
                >
                  {priorityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wide text-blue-200/60 mb-2 block">
                Notas
              </label>
              <textarea
                value={draft.notes}
                onChange={(event) =>
                  setDraft((state) => ({
                    ...state,
                    notes: event.target.value,
                  }))
                }
                rows={3}
                placeholder="Anote detalhes ou pontos de atenção"
                className="h-24 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-blue-200/50 focus:outline-none focus:ring-2 focus:ring-primary/60"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-blue-200/60">
                Dica: use vírgulas para separar tags. Ex.: design, sprint, revisão.
              </p>
              <Button
                type="submit"
                className="bg-gradient-to-r from-primary to-orange-500 text-white shadow-lg shadow-primary/40"
              >
                Adicionar tarefa
              </Button>
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect rounded-2xl p-6 border border-white/10 space-y-4"
          >
            <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
              <div className="relative lg:max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-200/60" />
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar por palavras-chave ou tags"
                  className="bg-white/5 border-white/10 pl-9 text-white placeholder:text-blue-200/50"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {filterOptions.map((option) => (
                  <Button
                    key={option.value}
                    type="button"
                    variant={filter === option.value ? 'default' : 'ghost'}
                    onClick={() => setFilter(option.value)}
                    className={
                      filter === option.value
                        ? 'bg-gradient-to-r from-primary to-orange-500 text-white'
                        : 'text-blue-200/70 hover:text-white'
                    }
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            {tagFilter && (
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-blue-200/70">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-primary" />
                  <span>Filtrando por {formatTag(tagFilter)}</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setTagFilter(null)}
                  className="text-blue-200/70 hover:text-white"
                >
                  Limpar
                </Button>
              </div>
            )}
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <AnimatePresence initial={false}>
              {filteredTasks.length === 0 ? (
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="glass-effect rounded-2xl p-10 text-center text-blue-200/70 border border-dashed border-white/20"
                >
                  Nenhuma tarefa encontrada com os filtros atuais.
                </motion.div>
              ) : (
                filteredTasks.map((task) => (
                  <motion.article
                    key={task.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`glass-effect rounded-2xl p-5 border border-white/10 transition ${
                      task.completed ? 'opacity-70' : ''
                    }`}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex flex-1 items-start gap-3">
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={() => toggleTask(task.id)}
                          className="mt-1"
                        />
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <h3
                              className={`text-lg font-semibold text-white ${
                                task.completed ? 'line-through text-blue-200/50' : ''
                              }`}
                            >
                              {task.title}
                            </h3>
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-medium ${priorityBadgeClasses[task.priority]}`}
                            >
                              {priorityOptions.find((option) => option.value === task.priority)
                                ?.label ?? 'Prioridade'}
                            </span>
                          </div>
                          {task.notes && (
                            <p className="mt-2 text-sm text-blue-200/70">{task.notes}</p>
                          )}
                          <div className="mt-3 flex flex-wrap gap-2">
                            {task.due && (
                              <span
                                className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs ${
                                  !task.completed && task.due < todayISO
                                    ? 'border-rose-500/40 bg-rose-500/10 text-rose-200'
                                    : 'border-white/10 bg-white/5 text-blue-200/70'
                                }`}
                              >
                                <CalendarDays className="h-3 w-3" />
                                {task.due}
                              </span>
                            )}
                            {task.tags?.map((tag) => (
                              <button
                                key={tag}
                                type="button"
                                onClick={() =>
                                  setTagFilter((current) =>
                                    current === tag ? null : tag,
                                  )
                                }
                                className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs transition ${
                                  tagFilter === tag
                                    ? 'border-primary/60 bg-primary/20 text-primary-foreground'
                                    : 'border-white/10 bg-white/5 text-blue-200/70 hover:text-white'
                                }`}
                              >
                                <Tag className="h-3 w-3" />
                                {formatTag(tag)}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => removeTask(task.id)}
                        className="text-blue-200/70 hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.article>
                ))
              )}
            </AnimatePresence>
          </motion.section>
        </div>

        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="glass-effect rounded-2xl p-6 border border-white/10 space-y-4">
            <h4 className="text-sm font-semibold text-white">Resumo rápido</h4>
            <div className="flex items-center justify-between text-sm text-blue-200/70">
              <span>Progresso</span>
              <span>{stats.completionRate}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-orange-500 transition-all duration-500"
                style={{ width: `${stats.completionRate}%` }}
              />
            </div>
            <p className="text-xs text-blue-200/60">
              {stats.completed} concluídas de {stats.total} tarefas cadastradas.
            </p>
          </div>

          <div className="glass-effect rounded-2xl p-6 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-white">Tags principais</h4>
              <Tag className="h-4 w-4 text-primary" />
            </div>

            {availableTags.length === 0 ? (
              <p className="text-sm text-blue-200/60">
                Adicione tags às tarefas para organizar melhor as trilhas de trabalho.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() =>
                      setTagFilter((current) => (current === tag ? null : tag))
                    }
                    className={`rounded-full border px-3 py-1 text-xs transition ${
                      tagFilter === tag
                        ? 'border-primary/60 bg-primary/20 text-primary-foreground'
                        : 'border-white/10 bg-white/5 text-blue-200/70 hover:text-white'
                    }`}
                  >
                    {formatTag(tag)}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="glass-effect rounded-2xl p-6 border border-white/10 space-y-3">
            <h4 className="text-sm font-semibold text-white">Ações rápidas</h4>
            <Button
              type="button"
              variant="ghost"
              onClick={clearCompleted}
              className="w-full justify-start gap-2 text-blue-200/70 hover:text-white"
            >
              <Trash2 className="h-4 w-4" />
              Limpar concluídas
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full justify-start gap-2 text-blue-200/70 hover:text-white"
              onClick={() => {
                setFilter('overdue');
                toast({
                  title: 'Foco nas urgências',
                  description:
                    'Mostrando tarefas atrasadas para priorizar os próximos passos.',
                });
              }}
            >
              <CalendarDays className="h-4 w-4" />
              Destacar atrasadas
            </Button>
          </div>
        </motion.aside>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, accent }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-effect rounded-2xl p-6 card-hover border border-white/10"
  >
    <div className="flex items-center justify-between">
      <span className="text-sm text-blue-200/70">{label}</span>
      <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-primary">
        {icon}
      </div>
    </div>
    <p className={`mt-4 text-3xl font-bold text-white ${accent ?? ''}`}>
      {value}
    </p>
  </motion.div>
);

export default Todo;

