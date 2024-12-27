'use client'

import { useState } from "react"
import { Header } from "./components/header"
import { CreateProjectForm } from "./components/create-project-form"
import { ProjectList } from "./components/project-list"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { SearchBar } from '@/components/search-bar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useProjects } from "@/hooks/use-projects"

export default function Dashboard() {
  const { projects, addProject, loading } = useProjects()
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleCreateProject = async (name: string, description: string) => {
    await addProject(name, description)
    setDialogOpen(false)
  }

  if (loading) return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container mx-auto p-6">
          <div>Loading projects...</div>
        </div>
      </main>
    </>
  )

  return (
    <>
      <Header />
      <main className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="container mx-auto p-6 space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <h1 className="text-3xl font-bold">Projects</h1>
                <div className="max-w-xs flex-1">
                  <SearchBar />
                </div>
              </div>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <PlusCircle className="h-5 w-5" />
                    Create Project
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create a New Project</DialogTitle>
                    <DialogDescription>
                      Add a new project to your dashboard. Fill in the details below.
                    </DialogDescription>
                  </DialogHeader>
                  <CreateProjectForm onCreateProject={handleCreateProject} />
                </DialogContent>
              </Dialog>
            </div>

            <ProjectList projects={projects} />
          </div>
        </ScrollArea>
      </main>
    </>
  )
}
