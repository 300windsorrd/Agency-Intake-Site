export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <div className="mt-16 border-t border-slate-800">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-10 text-sm text-slate-400 sm:flex-row">
        <div>&copy; {year} BiteSites. All rights reserved.</div>
        <nav aria-label="Footer" className="flex items-center gap-4">
          <a href="/" className="hover:underline">Home</a>
          <a href="/about" className="hover:underline">About</a>
          <a href="/pricing" className="hover:underline">Pricing</a>
          <a href="/start" className="hover:underline">Start a Project</a>
        </nav>
      </div>
    </div>
  )
}


