import { useState, useEffect } from 'react'
import { Project } from '@/types'

const STORAGE_KEY = 'projecthub_projects'

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      // First try to get from localStorage
      const storedProjects = localStorage.getItem(STORAGE_KEY)
      if (storedProjects) {
        setProjects(JSON.parse(storedProjects))
        setIsLoading(false)
        return
      }

      // If not in localStorage, fetch from API
      const response = await fetch('/api/projects')
      if (!response.ok) {
        throw new Error('Failed to fetch projects')
      }
      const data = await response.json()
      setProjects(data)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      setIsLoading(false)
    } catch (err) {
      setError('Failed to fetch projects')
      setIsLoading(false)
    }
  }

  const addProject = async (name: string, description: string) => {
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to create project')
      }
      
      const newProject = await response.json()
      const updatedProjects = [...projects, newProject]
      setProjects(updatedProjects)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects))
      return newProject
    } catch (err) {
      setError('Failed to create project')
      throw err
    }
  }

  return { projects, addProject, isLoading, error }
}
