'use client'

import { useState } from "react"
import { Bell, Search, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "./theme-toggle"
import { UserNav } from "./user-nav"
import { useSession, signOut } from "next-auth/react"
import { useToast } from "@/components/ui/use-toast"

export function Header() {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSignOut = async () => {
    try {
      setIsLoading(true)
      await signOut({ callbackUrl: '/auth/signin' })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold">ProjectHub</h2>
          <div className="hidden md:block">
            <Input
              type="search"
              placeholder="Search projects..."
              className="w-[300px]"
              prefix={<Search className="h-4 w-4 text-muted-foreground" />}
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {session ? (
            <>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <UserNav />
              <Button 
                variant="destructive" 
                onClick={handleSignOut}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {isLoading ? "Signing out..." : "Sign Out"}
              </Button>
            </>
          ) : (
            <Button 
              variant="default"
              onClick={() => window.location.href = '/auth/signin'}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
