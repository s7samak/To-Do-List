"use client";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Circle, Filter, ListChecks, Plus, Search, TrendingUp, X } from "lucide-react";
import Navbar from "./components/Navbar/Navbar";
import { useEffect, useMemo, useState } from "react";
import { Todo, TodoFilters } from "./types/todo";
import { TodoModal } from "./components/TodoModal/TodoModal";
import { DraggableTodoItem } from "./components/DraggableTodoItem/DraggableTodoItem";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = localStorage.getItem('todos');
    return stored ? JSON.parse(stored) : [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [filters, setFilters] = useState<TodoFilters>({
    search: '',
    category: 'all',
    priority: 'all',
    status: 'all',
  });
  const [showFilters, setShowFilters] = useState(false);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Filter todos
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const matchesSearch =
        todo.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        todo.description?.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = filters.category === 'all' || todo.category === filters.category;
      const matchesPriority = filters.priority === 'all' || todo.priority === filters.priority;
      const matchesStatus =
        filters.status === 'all' ||
        (filters.status === 'active' && !todo.completed) ||
        (filters.status === 'completed' && todo.completed);

      return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
    });
  }, [todos, filters]);

  // Statistics
  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const active = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, active, completionRate };
  }, [todos]);

  const handleSaveTodo = (todoData: Partial<Todo>) => {
    if (editingTodo) {
      setTodos(
        todos.map((t) =>
          t.id === editingTodo.id ? { ...t, ...todoData } : t
        )
      );
      setEditingTodo(null);
    } else {
      const newTodo: Todo = {
        id: Date.now().toString(),
        title: todoData.title!,
        description: todoData.description,
        completed: false,
        priority: todoData.priority || 'medium',
        category: todoData.category || 'personal',
        dueDate: todoData.dueDate,
        createdAt: new Date().toISOString(),
      };
      setTodos([newTodo, ...todos]);
    }
  };

  const handleToggleTodo = (id: string) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      priority: 'all',
      status: 'all',
    });
  };

  const hasActiveFilters = filters.search || filters.category !== 'all' || filters.priority !== 'all' || filters.status !== 'all';

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 py-8 px-4">
      <div>
        <Navbar />
      </div>
      <div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1 }}
            className="mt-9 flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Total Tasks</p>
              <p className="text-3xl text-gray-900 dark:text-gray-100">{stats.total}</p>
            </div>
            <div className={`p-3 rounded-lg bg-linear-to-br from-blue-500 to-blue-600`}>
              <ListChecks className="size-6 text-white" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-9 flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Active</p>
              <p className="text-3xl text-gray-900 dark:text-gray-100">{stats.active}</p>
            </div>
            <div className={`p-3 rounded-lg bg-linear-to-br from-orange-500 to-orange-600`}>
              <Circle className="size-6 text-white" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-9 flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Completed</p>
              <p className="text-3xl text-gray-900 dark:text-gray-100">{stats.completed}</p>
            </div>
            <div className={`p-3 rounded-lg bg-linear-to-br from-green-500 to-green-600`}>
              <CheckCircle2 className="size-6 text-white" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-9 flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Completion</p>
              <p className="text-3xl text-gray-900 dark:text-gray-100">{stats.completionRate}</p>
            </div>
            <div className={`p-3 rounded-lg bg-linear-to-br from-purple-500 to-purple-600`}>
              <TrendingUp className="size-6 text-white" />
            </div>
          </motion.div>
        </div>
      </div>
      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`hover:cursor-pointer px-4 py-3 rounded-lg flex items-center gap-2 transition-all ${showFilters || hasActiveFilters
              ? 'bg-linear-to-br from-blue-500 to-purple-600 text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
          >
            <Filter className="size-5" />
            <span className="hidden md:inline">Filters</span>
            {hasActiveFilters && (
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                Active
              </span>
            )}
          </button>

          {/* Add Task Button */}
          <button
            onClick={() => {
              setEditingTodo(null);
              setIsModalOpen(true);
            }}
            className="hover:cursor-pointer px-6 py-3 bg-linear-to-br from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Plus className="size-5" />
            <span>New Task</span>
          </button>
        </div>

        {/* Filter Options */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Status Filter */}
                <div>
                  <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                    Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) =>
                      setFilters({ ...filters, status: e.target.value as any })
                    }
                    className="hover:cursor-pointer w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
                  >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) =>
                      setFilters({ ...filters, category: e.target.value as any })
                    }
                    className="hover:cursor-pointer w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
                  >
                    <option value="all">All Categories</option>
                    <option value="personal">Personal</option>
                    <option value="work">Work</option>
                    <option value="shopping">Shopping</option>
                    <option value="health">Health</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Priority Filter */}
                <div>
                  <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                    Priority
                  </label>
                  <select
                    value={filters.priority}
                    onChange={(e) =>
                      setFilters({ ...filters, priority: e.target.value as any })
                    }
                    className="hover:cursor-pointer w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
                  >
                    <option value="all">All Priorities</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="hover:cursor-pointer mt-3 px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
                >
                  <X className="size-4" />
                  Clear Filters
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredTodos.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <div className="inline-block p-6 bg-white dark:bg-gray-800 rounded-full shadow-lg mb-4 border border-gray-200 dark:border-gray-700">
                  <ListChecks className="size-12 text-gray-400" />
                </div>
                <h3 className="text-xl mb-2 text-gray-700 dark:text-gray-300">
                  {hasActiveFilters ? 'No tasks match your filters' : 'No tasks yet'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  {hasActiveFilters
                    ? 'Try adjusting your filters'
                    : 'Create your first task to get started'}
                </p>
                {!hasActiveFilters && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="hover:cursor-pointer px-6 py-3 bg-linear-to-br from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all inline-flex items-center gap-2"
                  >
                    <Plus className="size-5" />
                    Create Task
                  </button>
                )}
              </motion.div>
            ) : (
              filteredTodos.map((todo, index) => (
                <DraggableTodoItem
                 key={index}
                  todo={todo}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                  onEdit={handleEditTodo}
                />
              ))
            )}
          </AnimatePresence>
        </div>
        {/* Modal */}
        <TodoModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTodo(null);
          }}
          onSave={handleSaveTodo}
          editTodo={editingTodo}
        />
      </div>
    </div >
  );
}
