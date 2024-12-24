import { NextResponse } from 'next/server'
import { Project } from '@/types'

// This would typically come from a database
export let projects: Project[] = [
  {
    id: '1703423555000', // Using timestamp format for consistency
    name: 'Example Project',
    description: 'This is an example project',
    tasks: []
  }
]

export async function GET() {
  try {
    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    if (!body.name || !body.description) {
      return NextResponse.json(
        { error: 'Name and description are required' },
        { status: 400 }
      )
    }

    const newProject: Project = {
      id: Date.now().toString(), // Consistent timestamp format
      name: body.name,
      description: body.description,
      tasks: [],
    }
    
    projects.push(newProject)
    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
