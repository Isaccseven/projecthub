'use client'

import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider } from "@/components/providers/session-provider"
import { Toaster } from "@/components/ui/toaster"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider 
        attribute="class" 
        defaultTheme="system" 
        enableSystem 
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  )
}
