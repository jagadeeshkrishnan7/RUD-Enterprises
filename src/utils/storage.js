const STORAGE_KEY = 'fabrication_company_site_v1'

const defaultLogo =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxMjgiIHJ4PSIyMCIgZmlsbD0iIzBmNzY2ZSIvPjxwYXRoIGQ9Ik0zNiAzNkg4NFY1Mkg1MlY2NEg3NlY5MkgzNlYzNloiIGZpbGw9IiNmNmZmZmMiLz48L3N2Zz4='

export const defaultSiteData = {
  companyName: 'Precision Fabrication Group',
  logo: defaultLogo,
  hero: {
    heading: 'Engineered Fabrication for Demanding Industries',
    subheading:
      'We design, build, and deliver precision metal fabrication programs for energy, logistics, and industrial automation leaders.',
    image:
      'https://images.unsplash.com/photo-1581092588427-7f89d4ea796d?auto=format&fit=crop&w=1800&q=80',
  },
  contact: {
    header: 'Speak With Our Fabrication Specialists',
    description:
      'Tell us about your project and timeline. Our engineering team will review your requirements and respond with next steps.',
    recipientEmail: 'inquiries@precisionfab.com',
  },
  footer: {
    address: '85 Industrial Corridor, Houston, TX 77032',
    emails: ['info@precisionfab.com', 'sales@precisionfab.com'],
    phones: ['+1 (713) 555-0143', '+1 (713) 555-0188'],
  },
  homeSections: [
    {
      id: crypto.randomUUID(),
      title: 'Heavy-Duty Structure Manufacturing',
      description:
        'From CNC plasma cutting through robotic welding and final coating, our production line is optimized for repeatable quality across high-volume structural components. Each part is inspected with digital QA checkpoints to ensure strict dimensional compliance and long-term durability in aggressive environments.',
      image:
        'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: crypto.randomUUID(),
      title: 'Turnkey Assembly Programs',
      description:
        'Our cross-functional teams handle the complete lifecycle of custom fabricated assemblies, including prototyping, sourcing, machining, welding, and kitting. Dedicated account management and transparent production milestones keep your launch schedule predictable and your stakeholders informed at every stage.',
      image:
        'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80',
    },
  ],
  about: {
    header: 'Built on Craftsmanship, Driven by Process Excellence',
    description:
      'Precision Fabrication Group combines deep manufacturing expertise with modern process control to deliver high-performing components at scale. Our facilities are equipped for complex fabrication, while our project teams prioritize quality, safety, and responsiveness from kickoff through final shipment.',
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22731f89c9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581092921461-eab10380d98a?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  theme: {
    backgroundColor: '#eef3f1',
    primaryColor: '#0f766e',
  },
}

const mergeObjects = (base, source) => {
  if (Array.isArray(base)) {
    return Array.isArray(source) ? source : base
  }

  if (typeof base !== 'object' || base === null) {
    return source ?? base
  }

  const result = { ...base }
  for (const key of Object.keys(base)) {
    result[key] = mergeObjects(base[key], source?.[key])
  }

  if (source && typeof source === 'object') {
    for (const [key, value] of Object.entries(source)) {
      if (!(key in result)) {
        result[key] = value
      }
    }
  }

  return result
}

export const hasLocalData = () => {
  return localStorage.getItem(STORAGE_KEY) !== null
}

export const getSiteData = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) {
      return defaultSiteData
    }

    const parsed = JSON.parse(saved)
    return mergeObjects(defaultSiteData, parsed)
  } catch {
    return defaultSiteData
  }
}

export const saveSiteData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export const resetSiteData = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSiteData))
  return defaultSiteData
}
