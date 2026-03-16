'use client'

import { Info } from 'lucide-react'

export default function PricingNote() {
	return (
		<div className="mt-4 inline-flex items-start gap-2 text-sm text-slate-300">
			<Info className="mt-0.5 h-4 w-4 text-slate-400" />
			<p>
				Management fee: 10% of monthly ad spend. <span className="block sm:inline">Ad spend is paid directly to Google; our fee is billed monthly.</span>
			</p>
		</div>
	)
}


