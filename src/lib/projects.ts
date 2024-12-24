export async function getProject(id: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
  
  // First try to get from localStorage
  if (typeof window !== 'undefined') {
    const storedProjects = localStorage.getItem('projecthub_projects')
    if (storedProjects) {
      const projects = JSON.parse(storedProjects)
      const project = projects.find((p: any) => p.id === id)
      if (project) return project
    }
  }

  // If not found in localStorage or server-side, fetch from API
  try {
    const res = await fetch(`${apiUrl}/api/projects/${id}`, { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      if (res.status === 404) return null
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const project = await res.json()
    return project
  } catch (error) {
    console.error('Failed to fetch project:', error)
    throw error
  }
}
