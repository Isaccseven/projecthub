'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { DayPicker } from "react-day-picker"
import * as Popover from '@radix-ui/react-popover'
import { cn } from "@/lib/utils"
import "react-day-picker/dist/style.css"

interface CreateTaskFormProps {
  onCreateTask: (task: { title: string; status: 'todo' | 'in-progress' | 'done'; dueDate?: string }) => void
}

export function CreateTaskForm({ onCreateTask }: CreateTaskFormProps) {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState<Date>()

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    
    onCreateTask({
      title: title.trim(),
      status: 'todo',
      dueDate: date ? format(date, 'yyyy-MM-dd') : undefined
    })
    setTitle('')
    setDate(undefined)
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
      <Popover.Root>
        <Popover.Trigger asChild>
          <Button
            type="button"
            variant="outline"
            className={cn(
              "w-[40px] p-0",
              date && "text-primary"
            )}
          >
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className="z-50 rounded-md border bg-background p-3" sideOffset={5}>
            <DayPicker
              mode="single"
              selected={date}
              onSelect={setDate}
              showOutsideDays
              className="border-none"
              modifiersStyles={{
                today: { fontWeight: 'bold' },
                selected: { 
                  backgroundColor: 'hsl(var(--primary))',
                  color: 'hsl(var(--primary-foreground))',
                  fontWeight: 'bold'
                }
              }}
              styles={{
                caption: { color: 'hsl(var(--foreground))' },
                head_cell: { color: 'hsl(var(--foreground))' },
                day: { color: 'hsl(var(--foreground))' },
                nav_button: { color: 'hsl(var(--foreground))' }
              }}
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
      <Button type="submit">Add Task</Button>
    </form>
  )
}
