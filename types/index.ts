export interface Project {
  id: string
  name: string
  description: string
  tasks: Task[]
}

export interface Task {
  id: string
  title: string
  completed: boolean
}

