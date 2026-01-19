'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ExternalLink, Layers, Zap, Layout, Code, CheckCircle } from 'lucide-react'
import TiltedCard from '@/components/TiltedCard/TiltedCard'

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
    return (
        <section className="py-24 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                    >
                        Featured Work
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-600 max-w-2xl mx-auto"
                    >
                        A collection of bespoke digital experiences crafted with precision and passion.
                    </motion.p>
                </div>

                <div className="space-y-32">
                    {projects.map((project, index) => (
                        <ProjectSection key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function ProjectSection({ project, index }: { project: PortfolioProject; index: number }) {
    const isEven = index % 2 === 0
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    // Parallax effect for the image
    const y = useTransform(scrollYProgress, [0, 1], [0, 0]) // Currently disabled parallax, can enable if needed

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
            <div className="w-full lg:w-1/2 flex justify-center">
                <div className="relative">
                    <div
                        className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-3xl blur-2xl opacity-50"
                        style={{ background: `linear-gradient(to right, ${project.color}40, ${project.color}10)` }}
                    />
                    {/* @ts-ignore - TiltedCard is JS */}
                    <TiltedCard
                        imageSrc={project.imageUrl || ''}
                        videoSrc={project.videoUrl}
                        altText={project.title}
                        captionText={project.title}
                        containerHeight="400px"
                        containerWidth="100%"
                        imageHeight="400px"
                        imageWidth="600px"
                        rotateAmplitude={10}
                        scaleOnHover={1.05}
                        showMobileWarning={false}
                        showTooltip={true}
                        displayOverlayContent={true}
                        overlayContent={
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <p className="font-semibold">View Project</p>
                            </div>
                        }
                    />
                </div>
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-1/2 space-y-8">
                <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        {project.title}
                        <div className={`h-2 w-2 rounded-full`} style={{ backgroundColor: project.color }} />
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        {project.description}
                    </p>
                </div>

                <div className="space-y-4">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                        <Zap className="w-4 h-4" /> Key Features
                    </h4>
                    <ul className="grid grid-cols-1 gap-3">
                        {project.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-gray-700">
                                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                        <Layers className="w-4 h-4" /> Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200"
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
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all hover:scale-105 shadow-lg shadow-gray-900/20 group"
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
