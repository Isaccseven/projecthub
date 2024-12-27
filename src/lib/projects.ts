import { Project } from '@/types'

// In-memory storage for now, replace with database later
const projects: Project[] = []

export async function getProjects() {
  return projects
}

export async function createProject(data: Project) {
  const newProject: Project = {
    id: Date.now().toString(),
    title: data.title,
    description: data.description,
    tasks: [],
  }
  
  projects.push(newProject)
  return newProject
}

export async function getProjectById(id: string) {
  return projects.find(p => p.id === id)
}

export async function updateProject(id: string, data: Partial<Project>) {
  const index = projects.findIndex(p => p.id === id)
  if (index === -1) return null
  
  projects[index] = { ...projects[index], ...data }
  return projects[index]
}

export async function deleteProject(id: string) {
  const index = projects.findIndex(p => p.id === id)
  if (index === -1) return false
  
  projects.splice(index, 1)
  return true
}
