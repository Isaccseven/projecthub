import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Project } from "@/types"
import { ArrowRight } from "lucide-react"

interface ProjectListProps {
  projects: Project[]
}

export function ProjectList({ projects }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <Card className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">No projects created yet.</p>
      </Card>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Link href={`/projects/${project.id}`} key={project.id} className="block group">
          <Card className="h-full transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="group-hover:text-primary">{project.title}</CardTitle>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{project.description}</CardDescription>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
