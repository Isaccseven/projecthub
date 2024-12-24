'use client'

import { notFound } from "next/navigation"
import { useEffect, useState } from "react"
import { use } from "react"
import { ProjectDetails } from "@/components/project-details"
import { Project } from "@/types"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function ProjectPage({ params }: PageProps) {
  const { id } = use(params)
  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchProject() {
      try {
        // First try localStorage
        const storedProjects = localStorage.getItem('projecthub_projects')
        if (storedProjects) {
          const projects = JSON.parse(storedProjects)
          const found = projects.find((p: Project) => p.id === id)
          if (found) {
            setProject(found)
            setIsLoading(false)
            return
          }
        }

        // Fallback to API
        const response = await fetch(`/api/projects/${id}`)
        if (!response.ok) {
          if (response.status === 404) {
            notFound()
          }
          throw new Error('Failed to fetch project')
        }
        const data = await response.json()
        setProject(data)
      } catch (error) {
        console.error("Error fetching project:", error)
        notFound()
      } finally {
        setIsLoading(false)
      }
    }

    fetchProject()
  }, [id])

  if (isLoading) {
    return <div>Loading project...</div>
  }

  if (!project) {
    notFound()
  }

  return <ProjectDetails project={project} />
}
