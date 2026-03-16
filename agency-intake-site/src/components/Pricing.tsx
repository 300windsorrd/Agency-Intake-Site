"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Check, Globe2, Megaphone } from "lucide-react";

type PackageCard = {
  name: string;
  price: string;
  billing?: string;
  description: string;
  features: string[];
  featured?: boolean;
  buttonLabel: string;
};

type ServiceLine = {
  id: string;
  name: string;
  eyebrow: string;
  description: string;
  pricingModel: string;
  icon: typeof Globe2;
  accent: string;
  packages: PackageCard[];
};

const serviceLines: ServiceLine[] = [
  {
    id: "web-development",
    name: "Web Development",
    eyebrow: "Project-based",
    description:
      "From fast launch pages to full-scale digital platforms, every build is responsive, conversion-focused, and scoped around business goals.",
    pricingModel: "One-time project investment",
    icon: Globe2,
    accent: "from-sky-500/20 via-cyan-500/10 to-transparent",
    packages: [
      {
        name: "Starter Site",
        price: "From $1,000",
        description:
          "A sharp single-page site for early-stage launches or service-based businesses that need a credible web presence quickly.",
        features: [
          "Single-page site",
          "Responsive design",
          "Basic SEO",
          "One revision",
        ],
        buttonLabel: "Start Project",
      },
      {
        name: "Growth Site",
        price: "From $2,500",
        description:
          "A stronger marketing site with room for service detail, content publishing, and cleaner reporting.",
        features: [
          "Up to 5 pages",
          "Custom design and graphics",
          "Blog integration",
          "Basic analytics",
        ],
        featured: true,
        buttonLabel: "Start Project",
      },
      {
        name: "Professional Site",
        price: "From $5,000",
        description:
          "Built for brands that need tighter positioning, better search visibility, and stronger lead generation.",
        features: [
          "Up to 10 pages",
          "Advanced SEO",
          "Content strategy",
          "Lead capture forms",
          "Performance optimisation",
        ],
        buttonLabel: "Start Project",
      },
      {
        name: "Enterprise Site",
        price: "From $10,000",
        description:
          "Custom implementation for teams that need integrations, research, compliance, and internal handoff support.",
        features: [
          "Unlimited pages",
          "Custom integrations (CRM or e-commerce)",
          "UX research",
          "Accessibility compliance",
          "Training",
        ],
        buttonLabel: "Book Consultation",
      },
    ],
  },
  {
    id: "social-media-management",
    name: "Social Media Management",
    eyebrow: "Monthly retainer",
    description:
      "Structured monthly support for content, campaign execution, and audience growth across the platforms that matter most to your brand.",
    pricingModel: "Monthly retainer",
    icon: Megaphone,
    accent: "from-emerald-500/20 via-teal-500/10 to-transparent",
    packages: [
      {
        name: "Basic Social",
        price: "$1,000-$1,500",
        billing: "/mo",
        description:
          "Consistent posting and scheduling for brands that need an active presence without a full campaign layer.",
        features: [
          "8 to 12 posts per month on up to two platforms",
          "Content creation and scheduling",
          "Basic reporting",
        ],
        buttonLabel: "Book Consultation",
      },
      {
        name: "Growth Social",
        price: "$2,000-$3,000",
        billing: "/mo",
        description:
          "A stronger growth package with more volume, short-form video, and regular strategic planning.",
        features: [
          "12 to 20 posts across up to three platforms",
          "Short-form video production",
          "Monthly strategy session",
          "Community management",
        ],
        featured: true,
        buttonLabel: "Book Consultation",
      },
      {
        name: "Advanced Social",
        price: "$4,000-$6,000",
        billing: "/mo",
        description:
          "For teams ready to combine organic execution with paid support, experimentation, and deeper reporting.",
        features: [
          "20+ posts",
          "Paid ads management",
          "Influencer coordination",
          "Detailed analytics",
          "A/B testing",
        ],
        buttonLabel: "Book Consultation",
      },
      {
        name: "Enterprise Social",
        price: "$8,000+",
        billing: "/mo",
        description:
          "End-to-end campaign leadership for brands running coordinated, cross-channel growth efforts.",
        features: [
          "Full-funnel strategy",
          "Cross-channel campaign management",
          "Dedicated strategist",
          "Comprehensive reporting",
        ],
        buttonLabel: "Book Consultation",
      },
    ],
  },
  {
    id: "ai-automation",
    name: "AI Automation",
    eyebrow: "Project + usage-based",
    description:
      "Automation packages for chat, voice, and internal workflows, with scope split clearly between implementation and ongoing usage.",
    pricingModel: "Setup project plus recurring or usage-based fees",
    icon: Bot,
    accent: "from-fuchsia-500/20 via-violet-500/10 to-transparent",
    packages: [
      {
        name: "Starter Chatbot",
        price: "$5K-$8K setup",
        billing: "+ $100-$500/mo",
        description:
          "A practical first automation layer for FAQs, appointments, and simple operational handoff.",
        features: [
          "Rule-based bot for FAQs and appointments",
          "Basic CRM integration",
          "Maintenance",
        ],
        buttonLabel: "Start Project",
      },
      {
        name: "AI-Enhanced Chatbot",
        price: "$15K-$30K setup",
        billing: "+ $300-$1,500/mo",
        description:
          "More capable conversational AI for businesses that need broader language handling and system connectivity.",
        features: [
          "NLP capabilities",
          "Multi-language support",
          "API integrations",
        ],
        featured: true,
        buttonLabel: "Start Project",
      },
      {
        name: "Voice Agent",
        price: "$3K-$5K setup",
        billing: "+ $0.07-$0.15/min and $0.002/message",
        description:
          "Voice-first automation for inbound workflows, appointment routing, and customer support coverage.",
        features: [
          "Knowledge-base setup",
          "Call flows",
          "Pay-as-you-go usage pricing",
        ],
        buttonLabel: "Start Project",
      },
      {
        name: "Enterprise AI Solution",
        price: "$50K+",
        billing: "Custom pricing",
        description:
          "Designed for larger automation programs that require custom models, governance, and system-level integration.",
        features: [
          "Advanced NLP",
          "Sentiment analysis",
          "Integrations",
          "Compliance",
        ],
        buttonLabel: "Book Consultation",
      },
    ],
  },
];

const addOns = [
  {
    name: "Paid ads management",
    price: "Starting at $750/mo",
  },
  {
    name: "Additional website pages",
    price: "Starting at $250/page",
  },
  {
    name: "Additional integrations",
    price: "Starting at $1,500",
  },
  {
    name: "Extra social channel support",
    price: "Starting at $400/mo",
  },
  {
    name: "Custom reporting dashboards",
    price: "Starting at $600/mo",
  },
  {
    name: "Workflow expansion or new automations",
    price: "Starting at $2,500",
  },
];

export default function Pricing() {
  return (
    <div className="container py-14 md:py-16">
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-[linear-gradient(140deg,_rgba(15,23,42,0.98)_0%,_rgba(2,6,23,0.98)_48%,_rgba(15,23,42,0.95)_100%)] px-6 py-9 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.95)] sm:px-8 lg:px-10 lg:py-12"
      >
        <div
          className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-primary/15 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-300">
            BiteSites LLC Pricing
          </p>
          <h1 className="mt-4 max-w-3xl text-[2.35rem] font-bold tracking-tight text-slate-50 md:text-[3rem]">
            Web development, social media management, and AI automation packages
            built to scale with you.
          </h1>
          <p className="mt-4 max-w-2xl text-[0.98rem] leading-7 text-slate-300 lg:text-[1.05rem]">
            BiteSites offers structured service packages across web development,
            social media management, and AI automation so teams can compare
            scope quickly and move into the right engagement without guesswork.
          </p>
          <p className="mt-3 max-w-2xl text-[0.98rem] leading-7 text-slate-400">
            Custom quotes are available for hybrid engagements, larger rollouts,
            and custom implementation needs.
          </p>
        </div>

        <nav aria-label="Pricing service lines" className="relative mt-7">
          <div className="flex flex-wrap gap-3">
            {serviceLines.map((service) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-xs font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-800/80 sm:text-sm"
              >
                {service.name}
              </a>
            ))}
          </div>
        </nav>
      </motion.section>

      <div className="mt-12 space-y-12">
        {serviceLines.map((service, sectionIndex) => {
          const Icon = service.icon;

          return (
            <motion.section
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: sectionIndex * 0.05 }}
              className="scroll-mt-28"
            >
              <div className="overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950/70 shadow-[0_30px_90px_-60px_rgba(15,23,42,0.95)]">
                <div
                  className={`border-b border-slate-800 bg-gradient-to-r ${service.accent} px-6 py-7 sm:px-8 lg:px-9`}
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-3xl">
                        <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-slate-700 bg-slate-950/70 px-4 py-2 text-xs text-slate-200 sm:text-sm">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-slate-100">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span>{service.eyebrow}</span>
                      </div>
                      <h2 className="text-[1.9rem] font-bold text-slate-50 md:text-[2.2rem]">
                        {service.name}
                      </h2>
                      <p className="mt-3 max-w-2xl text-[0.98rem] leading-7 text-slate-300">
                        {service.description}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-700/80 bg-slate-950/65 px-5 py-4 text-xs text-slate-300 sm:text-sm">
                      <p className="font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Pricing model
                      </p>
                      <p className="mt-2 text-base font-medium text-slate-100">
                        {service.pricingModel}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 px-6 py-7 sm:px-8 lg:px-9 xl:grid-cols-4 xl:gap-5">
                  {service.packages.map((pkg, packageIndex) => (
                    <motion.article
                      key={pkg.name}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 0.35,
                        delay: packageIndex * 0.06,
                      }}
                      className={`flex h-full flex-col rounded-[1.5rem] border p-5 ${
                        pkg.featured
                          ? "border-primary bg-primary/10 shadow-[0_24px_70px_-40px_rgba(59,130,246,0.6)]"
                          : "border-slate-800 bg-slate-900/70"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-[1.15rem] font-bold text-slate-50">
                            {pkg.name}
                          </h3>
                          <p className="mt-3 text-sm leading-6 text-slate-300">
                            {pkg.description}
                          </p>
                        </div>
                        {pkg.featured && (
                          <span className="rounded-full border border-primary/50 bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-sky-200">
                            Popular
                          </span>
                        )}
                      </div>

                      <div className="mt-6">
                        <p className="text-[1.8rem] font-bold text-slate-50">
                          {pkg.price}
                        </p>
                        {pkg.billing && (
                          <p className="mt-2 text-sm font-medium text-slate-400">
                            {pkg.billing}
                          </p>
                        )}
                      </div>

                      <ul className="mt-6 flex-1 space-y-3">
                        {pkg.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-3 text-sm leading-6 text-slate-200"
                          >
                            <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                              <Check className="h-4 w-4" />
                            </span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-7">
                        <Link
                          href="/start"
                          className="inline-flex w-full items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
                          aria-label={`${pkg.buttonLabel} for ${pkg.name}`}
                        >
                          {pkg.buttonLabel}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            </motion.section>
          );
        })}
      </div>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45 }}
        className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] xl:gap-7"
      >
        <div className="rounded-[2rem] border border-slate-800 bg-slate-950/75 p-6 shadow-[0_30px_90px_-60px_rgba(15,23,42,0.95)] sm:p-7 lg:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
            Optional Add-ons
          </p>
          <h2 className="mt-4 text-[1.8rem] font-bold text-slate-50">
            Extend the package when the scope calls for it.
          </h2>
          <p className="mt-3 max-w-2xl text-[0.98rem] leading-7 text-slate-300">
            Add-ons can be layered onto any service line. Final pricing depends
            on the required platforms, integrations, and campaign complexity.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {addOns.map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-slate-800 bg-slate-900/65 p-[1.125rem]"
              >
                <p className="text-base font-semibold text-slate-100">
                  {item.name}
                </p>
                <p className="mt-2 text-sm font-medium text-sky-200">
                  {item.price}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-800 bg-[linear-gradient(180deg,_rgba(15,23,42,0.96)_0%,_rgba(2,6,23,0.98)_100%)] p-6 shadow-[0_30px_90px_-60px_rgba(15,23,42,0.95)] sm:p-7 lg:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
            Notes
          </p>
          <h2 className="mt-4 text-[1.8rem] font-bold text-slate-50">
            Custom packages are available.
          </h2>
          <div className="mt-6 space-y-4 text-[0.98rem] leading-7 text-slate-300">
            <p>
              Usage-based AI fees, third-party software, ad spend, and platform
              subscriptions are billed separately unless explicitly included in
              your proposal.
            </p>
            <p>
              Enterprise scopes may require discovery, compliance review, or
              migration planning before final pricing is confirmed.
            </p>
            <p>
              If you need a blended engagement across web, social, and
              automation, BiteSites can package the work into one custom scope
              and rollout plan.
            </p>
          </div>
          <div className="mt-8">
            <Link href="/start" className="btn-primary w-full sm:w-auto">
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
