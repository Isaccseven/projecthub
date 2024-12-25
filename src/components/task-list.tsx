'use client'

import { Task } from '@/types'
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from './ui/button'
import { Plus, Minus } from 'lucide-react'
import { CreateTaskForm } from './create-task-form'
import { useState } from 'react'
import { format } from 'date-fns'

interface TaskListProps {
  tasks: Task[]
  onToggleCompletion: (taskId: string) => void
  onAddSubtask?: (parentTaskId: string, subtask: Omit<Task, 'id'>) => void
  onDeleteTask: (taskId: string) => void
}

interface TaskItemProps {
  task: Task
  onToggleCompletion: (taskId: string) => void
  onAddSubtask?: (parentTaskId: string, subtask: Omit<Task, 'id'>) => void
  onDeleteTask: (taskId: string) => void
  level?: number
}

function TaskItem({ task, onToggleCompletion, onAddSubtask, onDeleteTask, level = 0 }: TaskItemProps) {
  const [showSubtaskForm, setShowSubtaskForm] = useState(false)

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div style={{ marginLeft: `${level * 24}px` }} className="flex-1 flex items-center gap-2">
          <Checkbox 
            checked={task.completed}
            onCheckedChange={() => onToggleCompletion(task.id)}
          />
          <div className="flex-1">
            <span className={task.completed ? "line-through text-muted-foreground" : ""}>
              {task.title}
            </span>
            {task.dueDate && (
              <div className="text-sm text-muted-foreground">
                Due: {format(new Date(task.dueDate), 'PP')}
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            {onAddSubtask && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowSubtaskForm(!showSubtaskForm)}
                className="h-8 w-8"
              >
                <Plus className="h-4 w-4" />
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onDeleteTask(task.id)}
              className="h-8 w-8"
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {showSubtaskForm && onAddSubtask && (
        <div style={{ marginLeft: `${(level + 1) * 24}px` }}>
          <CreateTaskForm 
            onCreateTask={(subtask) => {
              onAddSubtask(task.id, subtask)
              setShowSubtaskForm(false)
            }}
          />
        </div>
      )}

      {task.subtasks?.map((subtask) => (
        <TaskItem
          key={subtask.id}
          task={subtask}
          onToggleCompletion={onToggleCompletion}
          onAddSubtask={onAddSubtask}
          onDeleteTask={onDeleteTask}
          level={level + 1}
        />
      ))}
    </div>
  )
}

export function TaskList({ tasks, onToggleCompletion, onAddSubtask, onDeleteTask }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="text-muted-foreground">No tasks created yet.</p>
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleCompletion={onToggleCompletion}
          onAddSubtask={onAddSubtask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  )
}
