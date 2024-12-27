import { NextRequest, NextResponse } from 'next/server'
import { getProjectById, updateProject, deleteProject } from '@/lib/projects'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const project = await getProjectById(params.id)
    if (!project) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 })
    }
    return NextResponse.json(project)
  } catch {
    return NextResponse.json({ message: 'Failed to fetch project' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const project = await updateProject(params.id, data)
    if (!project) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 })
    }
    return NextResponse.json(project)
  } catch {
    return NextResponse.json({ message: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = await deleteProject(params.id)
    if (!success) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Project deleted successfully' })
  } catch {
    return NextResponse.json({ message: 'Failed to delete project' }, { status: 500 })
  }
}