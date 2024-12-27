import { NextResponse } from 'next/server'
import { getProjects, createProject } from '@/lib/projects'

export async function GET() {
  try {
    const projects = await getProjects()
    return NextResponse.json(projects)
  } catch {
    return NextResponse.json({ message: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const project = await createProject(data)
    return NextResponse.json(project)
  } catch {
    return NextResponse.json({ message: 'Failed to create project' }, { status: 500 })
  }
}
