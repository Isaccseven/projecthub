export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done';
  dueDate?: string;
  subtasks?: Task[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tasks?: Task[];
  createdAt?: string;
  updatedAt?: string;
}
