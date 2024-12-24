import { Bell, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "./theme-toggle"

export function Header() {
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
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <img
              src="https://avatars.githubusercontent.com/u/124599?v=4"
              alt="User avatar"
              className="h-8 w-8 rounded-full"
            />
            <span className="sr-only">User menu</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
