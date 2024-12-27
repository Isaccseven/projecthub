'use client'

import { Suspense } from 'react'
import Dashboard from '@/dashboard'

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dashboard />
    </Suspense>
  )
}
