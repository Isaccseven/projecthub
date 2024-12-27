'use client'

import { useEffect } from 'react'
import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider } from "@/components/providers/session-provider"
import { Toaster } from "@/components/ui/toaster"

export function RootProvider({
  children,
  className,
}: {
  children: React.ReactNode
  className: string
}) {
  useEffect(() => {
    // Add the classes to body after mount
    document.body.className = className
  }, [className])

  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  )
}
