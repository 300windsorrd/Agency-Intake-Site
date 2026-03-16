export interface ServiceAudience {
  segment: 'Small businesses' | 'Medium businesses' | 'Large businesses'
  description: string
  benefits: string[]
}

export interface ServiceDefinition {
  slug: 'web-development' | 'social-media-management' | 'ai-automation'
  title: string
  navLabel: string
  summary: string
  heroDescription: string
  intro: string
  includes: string[]
  audience: ServiceAudience[]
  outcomes: string[]
  process: string[]
}

export const serviceCatalog: ServiceDefinition[] = [
  {
    slug: 'web-development',
    title: 'Web Development',
    navLabel: 'Web Development',
    summary: 'Custom websites, landing pages, and conversion-focused builds that are fast, scalable, and easy to manage.',
    heroDescription:
      'We design and build websites that turn your online presence into a working sales asset. That includes strategy, UX, responsive development, integrations, and launch support.',
    intro:
      'Web development covers the full build of your digital experience, from page structure and messaging to performance, forms, analytics, and the technical details that keep the site reliable after launch.',
    includes: [
      'Custom site architecture, design direction, and page planning',
      'Responsive development for desktop, tablet, and mobile',
      'Lead forms, CRM hooks, analytics, and conversion tracking',
      'Performance, accessibility, and technical SEO foundations',
      'CMS or editable sections so your team can keep content current',
      'Launch support, QA, and post-launch optimization recommendations'
    ],
    audience: [
      {
        segment: 'Small businesses',
        description:
          'Ideal for small teams that need a credible online presence, stronger lead capture, and a site that finally reflects the quality of their service.',
        benefits: [
          'Replace outdated templates with a professional site',
          'Make it easier for prospects to understand and trust your offer',
          'Capture more inquiries without adding manual admin work'
        ]
      },
      {
        segment: 'Medium businesses',
        description:
          'Useful for growing companies with multiple offers, more internal stakeholders, and a need for better structure across service pages, campaigns, and reporting.',
        benefits: [
          'Support several service lines or audience segments cleanly',
          'Improve campaign landing pages and conversion paths',
          'Connect the website to existing sales or marketing workflows'
        ]
      },
      {
        segment: 'Large businesses',
        description:
          'Strong fit for larger organizations that need scalable systems, cleaner governance, and dependable execution across brand, technical, and operational requirements.',
        benefits: [
          'Support more complex content and approval processes',
          'Meet higher standards for accessibility and performance',
          'Coordinate integrations and rollout with less internal friction'
        ]
      }
    ],
    outcomes: [
      'A stronger first impression that improves credibility with buyers',
      'Clearer conversion paths for consultations, quotes, or sales',
      'Better page speed, mobile experience, and search readiness',
      'More reliable measurement of leads and campaign performance',
      'A site your team can update without rebuilding every page'
    ],
    process: [
      'Discovery to define goals, audience, and required functionality',
      'Page planning and design direction aligned to the sales journey',
      'Development, integration, QA, and launch preparation',
      'Post-launch refinement based on performance and user behavior'
    ]
  },
  {
    slug: 'social-media-management',
    title: 'Social Media Management',
    navLabel: 'Social Media Management',
    summary: 'Content planning, publishing, reporting, and channel management built to keep your brand active and consistent.',
    heroDescription:
      'We manage the planning, production, and publishing rhythm behind your social channels so your brand stays visible, credible, and aligned with business goals.',
    intro:
      'Social media management is more than posting consistently. It includes strategy, content planning, platform-specific execution, performance reviews, and adjustments based on what actually drives engagement and inquiries.',
    includes: [
      'Monthly content planning tied to your campaigns and priorities',
      'Platform-specific post copy, creative direction, and scheduling',
      'Brand voice guidance to keep content consistent across channels',
      'Community management support and audience response workflows',
      'Performance reporting with recommendations for the next cycle',
      'Coordination with website, lead generation, and launch activity'
    ],
    audience: [
      {
        segment: 'Small businesses',
        description:
          'Useful for owners who need a steady online presence but do not have time to plan, write, and publish content consistently.',
        benefits: [
          'Stay active online without relying on last-minute posting',
          'Showcase services, offers, and proof of work consistently',
          'Build trust with prospects before they ever contact you'
        ]
      },
      {
        segment: 'Medium businesses',
        description:
          'A strong fit for companies juggling several campaigns, locations, or service lines that need a more disciplined content engine.',
        benefits: [
          'Coordinate social content with launches and promotions',
          'Keep messaging aligned across multiple audiences or offers',
          'Use reporting to refine what content earns attention'
        ]
      },
      {
        segment: 'Large businesses',
        description:
          'Helpful for larger teams that need channel consistency, approval structure, and repeatable execution without losing brand control.',
        benefits: [
          'Support governance and content review across stakeholders',
          'Maintain a stronger publishing cadence across channels',
          'Turn social media into a measurable part of the marketing mix'
        ]
      }
    ],
    outcomes: [
      'A more consistent publishing cadence that keeps your brand visible',
      'Stronger content alignment between social, web, and campaigns',
      'Higher-quality engagement from audiences that fit your offer',
      'Better reporting on what themes and formats perform best',
      'Less internal scrambling around content creation and approvals'
    ],
    process: [
      'Audit your current channels, competitors, and messaging gaps',
      'Build a content system around campaigns, offers, and brand voice',
      'Publish, monitor performance, and adapt month over month',
      'Refine the plan based on engagement trends and business priorities'
    ]
  },
  {
    slug: 'ai-automation',
    title: 'AI Automation',
    navLabel: 'AI Automation',
    summary: 'Workflow automation, lead routing, AI-assisted operations, and time-saving systems for repetitive business processes.',
    heroDescription:
      'We identify repetitive work across sales, marketing, and operations, then build AI-assisted workflows that reduce manual effort and move information faster.',
    intro:
      'AI automation focuses on removing bottlenecks. That can include lead qualification, intake routing, follow-ups, reporting, internal notifications, and connected workflows between the tools your team already uses.',
    includes: [
      'Workflow mapping to identify high-friction manual tasks',
      'Automation design for intake, lead routing, and internal alerts',
      'AI-assisted summarization, categorization, and response support',
      'Tool integrations across forms, email, CRM, and project systems',
      'Fallback logic, QA, and human-review checkpoints where needed',
      'Documentation so your team can operate and maintain the system'
    ],
    audience: [
      {
        segment: 'Small businesses',
        description:
          'Ideal for lean teams that lose time copying information between tools or manually following up with new leads.',
        benefits: [
          'Reduce repetitive admin work without hiring immediately',
          'Speed up lead response and internal handoff',
          'Create reliable workflows with less manual tracking'
        ]
      },
      {
        segment: 'Medium businesses',
        description:
          'A good fit for growing companies where volume has increased and manual processes are slowing down fulfillment, sales, or reporting.',
        benefits: [
          'Standardize workflows across multiple team members',
          'Reduce delays caused by disconnected tools and inboxes',
          'Free up higher-value time for strategy and client work'
        ]
      },
      {
        segment: 'Large businesses',
        description:
          'Useful for larger organizations that need workflow consistency, stronger controls, and better visibility across complex processes.',
        benefits: [
          'Support more complex automation with defined review points',
          'Improve data flow between departments and systems',
          'Reduce process risk while increasing operational speed'
        ]
      }
    ],
    outcomes: [
      'Faster response times for new leads and internal requests',
      'Less repetitive admin work across sales and operations',
      'Cleaner handoffs between forms, inboxes, and downstream systems',
      'Better consistency in how data is categorized and routed',
      'More capacity for your team to focus on revenue-generating work'
    ],
    process: [
      'Map the workflow, pain points, and systems involved',
      'Design automation logic with human checkpoints where needed',
      'Implement, test, and monitor the workflow in production',
      'Iterate based on failure points, edge cases, and team feedback'
    ]
  }
]

export const serviceNavItems = serviceCatalog.map((service) => ({
  href: `/services/${service.slug}`,
  label: service.navLabel
}))

export function getServiceBySlug(slug: string) {
  return serviceCatalog.find((service) => service.slug === slug)
}
