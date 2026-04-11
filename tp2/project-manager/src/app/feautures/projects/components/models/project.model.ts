export interface Task {
  title: string;
  status: 'En attente' | 'En cours' | 'Terminé';
  priority: 'Haute' | 'Moyenne' | 'Basse';
}

export interface Project {
  name: string;
  description: string;
  status: 'En attente' | 'En cours' | 'Terminé';
  createdAt?: string;
  progress?: number;
  tasks: Task[];
}