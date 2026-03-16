'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Layers, Zap, CheckCircle } from 'lucide-react'
import TiltedCard from '@/components/TiltedCard/TiltedCard'
import { useBackground } from '@/contexts/BackgroundContext'

export interface PortfolioProject {
    id: string
    title: string
    description: string
    imageUrl?: string
    videoUrl?: string
    projectUrl?: string
    features: string[]
    techStack: string[]
    color: string
}

interface PortfolioShowcaseProps {
    projects: PortfolioProject[]
}

export default function PortfolioShowcase({ projects }: PortfolioShowcaseProps) {
    const { getButtonColor } = useBackground()
    const buttonColor = getButtonColor()

    return (
        <section className="relative overflow-hidden bg-slate-950/50 py-24">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(30,41,59,0.95),_rgba(2,6,23,0.98)_65%)]" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-block"
                    >
                        <h2 className="mb-6 bg-gradient-to-r from-slate-50 via-slate-300 to-slate-50 bg-clip-text pb-2 text-5xl font-bold text-transparent md:text-7xl">
                            Featured Work
                        </h2>
                        <motion.div
                            className="h-2 rounded-full mx-auto"
                            style={{
                                background: `linear-gradient(90deg, transparent, ${buttonColor}, transparent)`
                            }}
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="mx-auto mt-8 max-w-2xl text-xl font-light text-slate-300 md:text-2xl"
                    >
                        A curated selection of digital experiences crafted with precision, passion, and purpose.
                    </motion.p>
                </div>

                <div className="space-y-32">
                    {projects.map((project, index) => (
                        <div key={project.id}>
                            <ProjectSection project={project} index={index} />

                            {index < projects.length - 1 && (
                                <motion.div
                                    initial={{ opacity: 0, scaleX: 0 }}
                                    whileInView={{ opacity: 1, scaleX: 1 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="my-32 h-px w-full max-w-4xl mx-auto"
                                    style={{
                                        background: `linear-gradient(to right, transparent, ${project.color}, transparent)`,
                                        opacity: 0.3
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function ProjectSection({ project, index }: { project: PortfolioProject; index: number }) {
    const isEven = index % 2 === 0
    const ref = useRef(null)

    const { getButtonColor, getButtonTextColor } = useBackground()
    const buttonColor = getButtonColor()
    const buttonTextColor = getButtonTextColor()

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}
        >
            {/* Image Side */}
            <div className="w-full lg:w-1/2 flex justify-center px-3 sm:px-4 lg:px-0">
                <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block w-full max-w-[600px] cursor-pointer"
                >
                    <div
                        className="absolute -inset-3 sm:-inset-4 rounded-3xl blur-2xl opacity-50 transition-opacity duration-300 group-hover:opacity-75"
                        style={{
                            background: `linear-gradient(to right, ${project.color}40, ${project.color}10)`,
                            // Optional: Mix in global color if desired, but project color seems better for the glow
                        }}
                    />
                    {/* @ts-ignore - TiltedCard is a JS component without TS props */}
                    <TiltedCard
                        imageSrc={project.imageUrl || ''}
                        videoSrc={project.videoUrl}
                        altText={project.title}
                        captionText={project.title}
                        containerHeight="400px"
                        containerWidth="100%"
                        imageHeight="400px"
                        imageWidth="100%"
                        rotateAmplitude={10}
                        scaleOnHover={1.05}
                        showMobileWarning={false}
                        showTooltip={true}
                        displayOverlayContent={true}
                        overlayContent={
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <p className="font-semibold flex items-center gap-2" style={{ color: buttonColor }}>
                                    View Project <ExternalLink className="w-4 h-4" />
                                </p>
                            </div>
                        }
                    />
                </a>
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-1/2 space-y-8">
                <div>
                    <h3 className="mb-4 flex items-center gap-3 text-3xl font-bold text-slate-50">
                        {project.title}
                        <div className={`h-2 w-2 rounded-full`} style={{ backgroundColor: project.color }} />
                    </h3>
                    <p className="text-lg leading-relaxed text-slate-300">
                        {project.description}
                    </p>
                </div>

                <div className="space-y-4">
                    <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
                        <Zap className="w-4 h-4" /> Key Features
                    </h4>
                    <ul className="grid grid-cols-1 gap-3">
                        {project.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-slate-300">
                                <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" style={{ color: buttonColor }} />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
                        <Layers className="w-4 h-4" /> Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, idx) => (
                            <span
                                key={idx}
                                className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-sm font-medium text-slate-200"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {project.projectUrl && (
                    <div className="pt-4">
                        <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg hover:brightness-110 transition-all hover:scale-105 shadow-lg group"
                            style={{
                                backgroundColor: buttonColor,
                                color: buttonTextColor,
                                boxShadow: `0 10px 15px -3px ${buttonColor}40`
                            }}
                        >
                            Visit Website
                            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                )}
            </div>
        </motion.div>
    )
}
