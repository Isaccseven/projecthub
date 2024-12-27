'use client'

import { ReactNode } from 'react'

export function ProjectsLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
}
