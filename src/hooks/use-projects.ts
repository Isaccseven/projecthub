import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Project } from '@/types'

const STORAGE_KEY = 'projecthub_projects'

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('q')?.toLowerCase() || ''

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true)
      // First try to get from localStorage
      const storedProjects = localStorage.getItem(STORAGE_KEY)
      if (storedProjects) {
        setProjects(JSON.parse(storedProjects))
        setLoading(false)
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
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const filteredProjects = projects.filter(project => 
    !searchQuery || (
      project.title?.toLowerCase().includes(searchQuery) || 
      project.description?.toLowerCase().includes(searchQuery) || 
      false
    )
  )

  const addProject = async (title: string, description: string) => {
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          tasks: [],
        }),
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
      setLoading(false)
      throw err
    }
  }

  return {
    projects: filteredProjects,
    addProject,
    loading,
    refetch: fetchProjects
  }
}
