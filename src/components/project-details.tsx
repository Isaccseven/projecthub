'use client'

import { useState } from 'react'
import { Project, Task } from '@/types'
import { Header } from './header'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TaskList } from './task-list'
import { CreateTaskForm } from './create-task-form'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function ProjectDetails({ project }: { project: Project }) {
  const [tasks, setTasks] = useState<Task[]>(project.tasks || [])
  const router = useRouter()

  const updateProjectInStorage = async (updatedTasks: Task[]) => {
    try {
      // Update in localStorage
      const storedProjects = localStorage.getItem('projecthub_projects')
      if (storedProjects) {
        const projects = JSON.parse(storedProjects)
        const updatedProjects = projects.map((p: Project) =>
          p.id === project.id ? { ...p, tasks: updatedTasks } : p
        )
        localStorage.setItem('projecthub_projects', JSON.stringify(updatedProjects))
      }

      // Update in API
      await fetch(`/api/projects/${project.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tasks: updatedTasks }),
      })
    } catch (error) {
      console.error('Failed to update project:', error)
    }
  }

  const addTask = async (newTask: Omit<Task, 'id'>) => {
    const task = { ...newTask, id: Date.now().toString() }
    const updatedTasks = [...tasks, task]
    setTasks(updatedTasks)
    await updateProjectInStorage(updatedTasks)
  }

  const toggleTaskCompletion = async (taskId: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    )
    setTasks(updatedTasks)
    await updateProjectInStorage(updatedTasks)
  }

  const completedTasks = tasks.filter(task => task.completed).length
  const progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push('/projects')}
                className="h-10 w-10"
              >
                <ArrowLeft className="h-6 w-6" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold">{project.name}</h1>
                <p className="text-muted-foreground">{project.description}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={progress} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  {completedTasks} of {tasks.length} tasks completed
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <TaskList tasks={tasks} onToggleCompletion={toggleTaskCompletion} />
                <div className="mt-6 pt-6 border-t">
                  <CreateTaskForm onCreateTask={addTask} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
