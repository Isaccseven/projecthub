import '../globals.css'
import { Inter } from 'next/font/google'
import { ProjectsLayout } from '@/components/projects-layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Project Dashboard',
  description: 'Manage your projects with ease',
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={inter.className}>
      <ProjectsLayout>
        {children}
      </ProjectsLayout>
    </div>
  )
}
