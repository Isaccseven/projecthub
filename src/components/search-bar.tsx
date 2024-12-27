'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export function SearchBar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const debouncedSearch = useDebounce(searchQuery, 300)

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (debouncedSearch) {
      params.set('q', debouncedSearch)
    } else {
      params.delete('q')
    }
    
    router.push(`${pathname}?${params.toString()}`)
  }, [debouncedSearch, pathname, router, searchParams])

  return (
    <Suspense>
    <div className="relative w-full max-w-[300px]">
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search projects..."
        className="pl-8"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
    </Suspense>
  )
}
