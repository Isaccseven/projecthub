import { Task } from '@/types'
import { Checkbox } from "@/components/ui/checkbox"

interface TaskListProps {
  tasks: Task[]
  onToggleCompletion: (taskId: string) => void
}

export function TaskList({ tasks, onToggleCompletion }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="text-muted-foreground">No tasks created yet.</p>
  }

  return (
    <div className="mt-4 space-y-3">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center gap-3">
          <Checkbox
            id={task.id}
            checked={task.completed}
            onCheckedChange={() => onToggleCompletion(task.id)}
          />
          <label
            htmlFor={task.id}
            className={`text-sm ${task.completed ? 'text-muted-foreground line-through' : ''}`}
          >
            {task.title}
          </label>
        </div>
      ))}
    </div>
  )
}
