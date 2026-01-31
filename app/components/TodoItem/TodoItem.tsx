"use client";

import { Todo, Priority } from '@/app/types/todo';
import { Check, Trash2, Calendar, Flag } from 'lucide-react';
import { motion } from 'motion/react';
import { format } from 'date-fns';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}


const priorityColors: Record<Priority, string> = {
  low: 'bg-green-500',
  medium: 'bg-yellow-500',
  high: 'bg-red-500'
};

const categoryColors: Record<string, string> = {
  personal: 'bg-purple-500',
  work: 'bg-blue-500',
  shopping: 'bg-pink-500',
  health: 'bg-green-500',
  other: 'bg-gray-500'
};

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={`hover:cursor-pointer group relative bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700 ${isOverdue ? 'ring-2 ring-red-400' : ''
        }`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(todo.id)}
          className={`shrink-0 size-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 mt-0.5 ${todo.completed
              ? 'bg-linear-to-br from-blue-500 to-purple-600 border-transparent'
              : 'border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400'
            }`}
        >
          {todo.completed && <Check className="size-4 text-white" strokeWidth={3} />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0" onClick={() => onEdit(todo)}>
          <div className="flex items-start gap-2 mb-2">
            <h3
              className={`flex-1 cursor-pointer transition-all duration-200 ${todo.completed
                  ? 'line-through text-gray-400 dark:text-gray-500'
                  : 'text-gray-800 dark:text-gray-100'
                }`}
            >
              {todo.title}
            </h3>
          </div>

          {todo.description && (
            <p className={`text-sm mb-2 ${todo.completed ? 'text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-400'
              }`}>
              {todo.description}
            </p>
          )}

          <div className="flex items-center gap-2 flex-wrap">
            {/* Category Badge */}
            <span className={`px-2 py-1 rounded-md text-xs text-white ${categoryColors[todo.category]}`}>
              {todo.category}
            </span>

            {/* Priority Badge */}
            <span className="flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              <Flag className={`size-3 ${priorityColors[todo.priority]}`} fill="currentColor" />
              {todo.priority}
            </span>

            {/* Due Date */}
            {todo.dueDate && (
              <span className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs ${isOverdue
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}>
                <Calendar className="size-3" />
                {format(new Date(todo.dueDate), 'MMM dd, yyyy')}
              </span>
            )}
          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(todo.id)}
          className="hover:cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg"
        >
          <Trash2 className="size-5" />
        </button>
      </div>
    </motion.div>
  );
}
