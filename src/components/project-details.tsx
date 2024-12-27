'use client'

import { useState } from 'react'
import { Project, Task } from '@/types'
import { Header } from './header'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TaskList } from './task-list'
import { CreateTaskForm } from './create-task-form'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ProjectDetails({ project }: { project: Project }) {
  const [tasks, setTasks] = useState<Task[]>(project.tasks || [])
  const [showAddTaskForm, setShowAddTaskForm] = useState(false)
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
    setShowAddTaskForm(false)
    await updateProjectInStorage(updatedTasks)
  }

  const addSubtask = async (parentTaskId: string, subtask: Omit<Task, 'id'>) => {
    const newSubtask = { ...subtask, id: Date.now().toString() }
    
    const updateTasksRecursively = (tasks: Task[]): Task[] => {
      return tasks.map(task => {
        if (task.id === parentTaskId) {
          return {
            ...task,
            subtasks: [...(task.subtasks || []), newSubtask]
          }
        }
        if (task.subtasks) {
          return {
            ...task,
            subtasks: updateTasksRecursively(task.subtasks)
          }
        }
        return task
      })
    }

    const updatedTasks = updateTasksRecursively(tasks)
    setTasks(updatedTasks)
    await updateProjectInStorage(updatedTasks)
  }

  const toggleTaskCompletion = async (taskId: string) => {
    const toggleTask = (tasks: Task[]): Task[] => {
      return tasks.map(task => {
        const taskCopy = { ...task }
        if (taskCopy.id === taskId) {
          taskCopy.status = taskCopy.status === 'done' ? 'todo' : 'done'
          return taskCopy
        }
        if (taskCopy.subtasks) {
          taskCopy.subtasks = toggleTask(taskCopy.subtasks)
          return taskCopy
        }
        return taskCopy
      })
    }

    const updatedTasks = toggleTask(tasks)
    setTasks(updatedTasks)
    await updateProjectInStorage(updatedTasks)
  }

  const deleteTask = async (taskId: string) => {
    const deleteTaskRecursively = (tasks: Task[]): Task[] => {
      return tasks.filter(task => {
        if (task.id === taskId) {
          return false;
        }
        if (task.subtasks) {
          task.subtasks = deleteTaskRecursively(task.subtasks);
        }
        return true;
      });
    };

    const updatedTasks = deleteTaskRecursively(tasks);
    setTasks(updatedTasks);
    await updateProjectInStorage(updatedTasks);
  };

  const deleteProject = async () => {
    try {
      // Delete from localStorage
      const storedProjects = localStorage.getItem('projecthub_projects')
      if (storedProjects) {
        const projects = JSON.parse(storedProjects)
        const updatedProjects = projects.filter((p: Project) => p.id !== project.id)
        localStorage.setItem('projecthub_projects', JSON.stringify(updatedProjects))
      }

      // Delete from API
      await fetch(`/api/projects/${project.id}`, {
        method: 'DELETE',
      })

      // Redirect to projects page
      router.push('/projects')
    } catch (error) {
      console.error('Failed to delete project:', error)
    }
  }

  const countTasks = (tasks: Task[]): number => {
    return tasks.reduce((count, task) => {
      return count + 1 + (task.subtasks ? countTasks(task.subtasks) : 0)
    }, 0)
  }

  const countCompletedTasks = (tasks: Task[]): number => {
    return tasks.reduce((count, task) => {
      const subtasksCompleted = task.subtasks ? countCompletedTasks(task.subtasks) : 0
      return count + (task.status === 'done' ? 1 : 0) + subtasksCompleted
    }, 0)
  }

  const totalTasks = countTasks(tasks)
  const completedTasks = countCompletedTasks(tasks)
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

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
                <h1 className="text-3xl font-bold">{project.title}</h1>
                <p className="text-muted-foreground">{project.description}</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="text-destructive" onClick={deleteProject}>
                  Delete Project
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={progress} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  {completedTasks} of {totalTasks} tasks completed
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Tasks</CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setShowAddTaskForm(!showAddTaskForm)}
                  className="h-8 w-8"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                {showAddTaskForm && (
                  <div className="mb-4">
                    <CreateTaskForm onCreateTask={addTask} />
                  </div>
                )}
                <TaskList 
                  tasks={tasks} 
                  onToggleCompletion={toggleTaskCompletion}
                  onAddSubtask={addSubtask}
                  onDeleteTask={deleteTask}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
