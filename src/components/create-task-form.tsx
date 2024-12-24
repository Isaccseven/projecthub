import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface CreateTaskFormProps {
  onCreateTask: (task: { title: string; completed: boolean }) => void
}

export function CreateTaskForm({ onCreateTask }: CreateTaskFormProps) {
  const [title, setTitle] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    
    onCreateTask({
      title: title.trim(),
      completed: false
    })
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder="New task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1"
      />
      <Button type="submit">Add Task</Button>
    </form>
  )
}
