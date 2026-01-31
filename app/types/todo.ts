export type Priority = 'low' | 'medium' | 'high';
export type Category = 'personal' | 'work' | 'shopping' | 'health' | 'other';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  dueDate?: string;
  createdAt: string;
}

export interface TodoFilters {
  search: string;
  category: Category | 'all';
  priority: Priority | 'all';
  status: 'all' | 'active' | 'completed';
}
