export interface Task {
  id: string
  title: string
  completed: boolean
  dueDate?: string
}

export interface Project {
  id: string
  name: string
  description: string
  tasks?: Task[]
}
