'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center p-8">
      <h1 className="text-3xl font-semibold text-slate-50">Page not found</h1>
      <p className="text-slate-300">The page you are looking for does not exist.</p>
      <Link href="/" className="text-sky-300 hover:underline">Go back home</Link>
    </div>
  )
}



