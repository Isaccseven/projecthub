'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface CreateProjectFormProps {
  onCreateProject: (title: string, description: string) => Promise<void>
}

export function CreateProjectForm({ onCreateProject }: CreateProjectFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim() && description.trim()) {
      setIsSubmitting(true)
      await onCreateProject(title, description)
      setTitle("")
      setDescription("")
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="project-title">Project Title</Label>
        <Input
          id="project-title"
          placeholder="Enter project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="project-description">Project Description</Label>
        <Textarea
          id="project-description"
          placeholder="Enter project description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Creating..." : "Create Project"}
      </Button>
    </form>
  )
}
