import { NextResponse } from 'next/server'
import { getProjectById, updateProject, deleteProject } from '@/lib/projects'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const project = await getProjectById(resolvedParams.id)
    if (!project) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 })
    }
    return NextResponse.json(project)
  } catch {
    return NextResponse.json({ message: 'Failed to fetch project' }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const body = await request.json()
    const updatedProject = await updateProject(resolvedParams.id, body)
    if (!updatedProject) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 })
    }
    return NextResponse.json(updatedProject)
  } catch {
    return NextResponse.json({ message: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const deletedProject = await deleteProject(resolvedParams.id)
    if (!deletedProject) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Project deleted successfully' })
  } catch {
    return NextResponse.json({ message: 'Failed to delete project' }, { status: 500 })
  }
}