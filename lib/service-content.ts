import type { Metadata } from 'next'

export type ServiceCard = {
  href: string
  icon: string
  title: string
  description: string
  items: string[]
}

export type ServiceItem = {
  icon: string
  title: string
  desc: string
  img?: string
}

export type ProcessStep = {
  step: string
  title: string
  desc: string
}

export type FaqItem = {
  q: string
  a: string
}

export type ServiceDetailContent = {
  title: string
  description: string
  eyebrow: string
  sectionTitle: string
  sectionDescription: string
  ctaLabel: string
  serviceItems: ServiceItem[]
  process: ProcessStep[]
  faqs: FaqItem[]
}

const companyName = 'Snel Remodeling Services'
const serviceArea = 'Salt Lake County, UT'
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://snelremodeling.com'

export const serviceCategories: ServiceCard[] = [
  {
    href: '/services/remodel',
    icon: 'bi-house-heart',
    title: 'Remodel',
    description:
      'Kitchen, bathroom, basement, bedroom, and flooring upgrades planned around your home, budget, and timeline.',
    items: ['Kitchen', 'Bathroom', 'Basement', 'Bedroom', 'Flooring'],
  },
  {
    href: '/services/restore',
    icon: 'bi-tools',
    title: 'Restore',
    description:
      'Painting, drywall, and water damage restoration services that bring damaged or dated interiors back to life.',
    items: ['Paint', 'Drywall', 'Water Damage'],
  },
  {
    href: '/services/demo',
    icon: 'bi-hammer',
    title: 'Demo',
    description:
      'Selective interior demolition, debris removal, and site prep that sets the stage for a cleaner remodel.',
    items: ['Interior Demo', 'Selective Demo', 'Debris Removal', 'Site Prep'],
  },
]

export const remodelCards: ServiceCard[] = [
  {
    href: '/services/remodel/kitchen',
    icon: 'bi-cup-hot',
    title: 'Kitchen',
    description:
      'Cabinets, countertops, layout updates, and appliance-ready remodels built for daily use.',
    items: ['Cabinets', 'Countertops', 'Layout Updates', 'Appliance Integration'],
  },
  {
    href: '/services/remodel/bathroom',
    icon: 'bi-droplet',
    title: 'Bathroom',
    description:
      'Tile, vanities, showers, tubs, and fixtures installed with durable finishes and careful waterproofing.',
    items: ['Tile Work', 'Vanities', 'Showers & Tubs', 'Fixtures'],
  },
  {
    href: '/services/remodel/basement',
    icon: 'bi-layers',
    title: 'Basement',
    description:
      'Basement finishing with framing, drywall, flooring, and egress planning for comfortable living space.',
    items: ['Framing', 'Drywall', 'Flooring', 'Egress'],
  },
  {
    href: '/services/remodel/bedroom',
    icon: 'bi-door-open',
    title: 'Bedroom',
    description:
      'Closet builds, trim upgrades, and layout changes that make bedrooms more functional and polished.',
    items: ['Closet Builds', 'Layout Changes', 'Trim Work', 'Flooring'],
  },
  {
    href: '/services/remodel/flooring',
    icon: 'bi-grid-3x3-gap',
    title: 'Flooring',
    description:
      'Hardwood, LVP, tile, and carpet installation with proper prep for durable, level finished floors.',
    items: ['Hardwood', 'LVP', 'Tile', 'Carpet'],
  },
]

export const restoreCards: ServiceCard[] = [
  {
    href: '/services/restore/paint',
    icon: 'bi-brush',
    title: 'Paint',
    description:
      'Interior and exterior painting, cabinet refinishing, accent walls, and color guidance for refreshed spaces.',
    items: ['Interior Paint', 'Exterior Paint', 'Cabinets', 'Accent Walls'],
  },
  {
    href: '/services/restore/drywall',
    icon: 'bi-grid-3x3',
    title: 'Drywall',
    description:
      'Installation, repairs, texture matching, and skim coating for walls and ceilings that look seamless.',
    items: ['Installation', 'Repairs', 'Texture Matching', 'Skim Coating'],
  },
  {
    href: '/services/restore/water-damage',
    icon: 'bi-droplet-half',
    title: 'Water Damage',
    description:
      'Assess damaged areas, remove compromised materials, and rebuild drywall, texture, and paint finishes.',
    items: ['Assessment', 'Selective Demo', 'Drywall Repair', 'Paint Restoration'],
  },
]

function createMetadata(title: string, description: string, keywords: string[]): Metadata {
  return { title, description, keywords }
}

function createServiceSchema(name: string, description: string, serviceType: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    provider: {
      '@type': 'LocalBusiness',
      name: companyName,
      areaServed: serviceArea,
      url: baseUrl,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: serviceArea,
    },
    description,
    serviceType,
    url: `${baseUrl}${path}`,
  }
}

export function createFaqSchema(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }
}

export const servicesIndexMetadata = createMetadata(
  'Services in Salt Lake County, UT',
  'Explore remodel, restoration, and demolition services from Snel Remodeling Services in Salt Lake County, UT.',
  ['Salt Lake County contractor', 'remodel services', 'restoration services', 'demolition contractor']
)

export const remodelMetadata = createMetadata(
  'Remodel Services in Salt Lake County, UT',
  'Browse kitchen, bathroom, basement, bedroom, and flooring remodel services in Salt Lake County, UT.',
  ['Salt Lake County remodeler', 'kitchen remodel', 'bathroom remodel', 'basement finishing', 'flooring contractor']
)

export const remodelSchema = createServiceSchema(
  'Remodel Services',
  'Kitchen, bathroom, basement, bedroom, and flooring remodel services in Salt Lake County, Utah.',
  'Home Remodeling',
  '/services/remodel'
)

export const restoreMetadata = createMetadata(
  'Restore Services in Salt Lake County, UT',
  'Painting, drywall, and water damage restoration services for homes across Salt Lake County, UT.',
  ['painting contractor Salt Lake County', 'drywall repair', 'water damage restoration', 'restore services']
)

export const restoreSchema = createServiceSchema(
  'Restore Services',
  'Painting, drywall, and water damage restoration services in Salt Lake County, Utah.',
  'Restoration Services',
  '/services/restore'
)

export const kitchenContent: ServiceDetailContent = {
  title: 'Kitchen Remodeling',
  description:
    'Upgrade cabinets, countertops, layout, and appliance spaces with a kitchen remodel designed for how your household cooks and gathers.',
  eyebrow: 'REMODEL SERVICES',
  sectionTitle: 'Kitchen Remodeling Services',
  sectionDescription:
    'We handle targeted kitchen upgrades and full remodels with careful planning, clean execution, and durable finishes.',
  ctaLabel: 'Get a Free Estimate',
  serviceItems: [
    { icon: 'bi-grid', title: 'Cabinet Installation', desc: 'New cabinets, refacing plans, and storage upgrades that improve function and keep the kitchen organized.', img: '/images/kitchen-cabinets.jpg' },
    { icon: 'bi-bounding-box', title: 'Countertop Upgrades', desc: 'Replace worn tops with durable surfaces sized, templated, and installed for a clean finished fit.', img: '/images/kitchen-modern.jpg' },
    { icon: 'bi-arrows-move', title: 'Layout Changes', desc: 'Rework traffic flow, island placement, and work zones so the space feels more open and usable.', img: '/images/kitchen-remodel.jpg' },
    { icon: 'bi-plug', title: 'Appliance Integration', desc: 'Prep for new ranges, refrigerators, dishwashers, and venting with coordinated electrical and finish work.', img: '/images/kitchen-remodel.jpg' },
    { icon: 'bi-lightbulb', title: 'Lighting & Fixtures', desc: 'Update pendants, under-cabinet lighting, plumbing fixtures, and other details that sharpen the finished look.', img: '/images/kitchen-modern.jpg' },
    { icon: 'bi-brush', title: 'Trim & Finishes', desc: 'Backsplashes, paint touchups, trim details, and punch-list work that make the remodel feel complete.', img: '/images/kitchen-cabinets.jpg' },
  ],
  process: [
    { step: '01', title: 'Walkthrough & Goals', desc: 'We review how you use the kitchen now and what needs to change for the remodel to pay off.' },
    { step: '02', title: 'Scope & Estimate', desc: 'You get a clear project scope, material guidance, and realistic pricing before work begins.' },
    { step: '03', title: 'Build & Coordination', desc: 'We sequence demo, framing, finishes, and installations to keep the project moving cleanly.' },
    { step: '04', title: 'Final Review', desc: 'We walk the completed kitchen with you, handle final details, and make sure everything is ready to enjoy.' },
  ],
  faqs: [
    { q: 'How long does a kitchen remodel usually take?', a: 'Most kitchen remodels take several weeks depending on layout changes, cabinet lead times, and finish selections. We give you a realistic schedule before work starts.' },
    { q: 'Can you help with partial kitchen upgrades?', a: 'Yes. We handle focused projects like countertops, cabinet swaps, flooring, and finish updates when a full gut remodel is not necessary.' },
    { q: 'Do I need to move out during the remodel?', a: 'Usually no, but you should plan for temporary kitchen disruption. We talk through access, dust control, and the best way to keep your home functional.' },
    { q: 'Do you remodel kitchens throughout Salt Lake County?', a: 'Yes. Snel Remodeling Services provides kitchen remodeling services across Salt Lake County, Utah, with free walkthroughs and detailed estimates.' },
  ],
}

export const kitchenMetadata = createMetadata(
  'Kitchen Remodeling in Salt Lake County, UT',
  'Kitchen remodeling in Salt Lake County, UT including cabinets, countertops, layout changes, and appliance-ready upgrades.',
  ['kitchen remodeling Salt Lake County', 'kitchen contractor Utah', 'cabinets countertops layout']
)

export const kitchenSchema = createServiceSchema(
  'Kitchen Remodeling',
  'Kitchen remodeling services including cabinets, countertops, layout changes, and appliance integration in Salt Lake County, Utah.',
  'Kitchen Remodeling',
  '/services/remodel/kitchen'
)

export const bathroomContent: ServiceDetailContent = {
  title: 'Bathroom Remodeling',
  description:
    'Refresh outdated bathrooms with tile, vanities, showers, tubs, fixtures, and layout updates built for everyday durability.',
  eyebrow: 'REMODEL SERVICES',
  sectionTitle: 'Bathroom Remodeling Services',
  sectionDescription:
    'From compact hall baths to primary suites, we build bathroom remodels that improve comfort, storage, and long-term performance.',
  ctaLabel: 'Get a Free Estimate',
  serviceItems: [
    { icon: 'bi-grid-3x3-gap', title: 'Tile Installation', desc: 'Floor, shower, and backsplash tile installed with straight lines, clean transitions, and durable setting materials.', img: '/images/bathroom-remodel.jpg' },
    { icon: 'bi-columns-gap', title: 'Vanity & Storage', desc: 'Replace dated vanities, mirrors, and storage so the room works better and looks more polished.', img: '/images/bathroom-remodel.jpg' },
    { icon: 'bi-droplet', title: 'Shower & Tub Updates', desc: 'New surrounds, shower conversions, and tub updates that improve function and visual impact.', img: '/images/bathroom-remodel.jpg' },
    { icon: 'bi-lightbulb', title: 'Fixture Replacements', desc: 'Install updated faucets, lighting, hardware, and accessories that tie the remodel together.', img: '/images/bathroom-remodel.jpg' },
    { icon: 'bi-square-half', title: 'Flooring & Trim', desc: 'Water-resistant flooring, base, casing, and finish trim selected to hold up in high-moisture spaces.', img: '/images/bathroom-remodel.jpg' },
    { icon: 'bi-wind', title: 'Ventilation & Finishes', desc: 'Better exhaust, moisture-resistant finishes, and final paint details that protect the room over time.', img: '/images/bathroom-remodel.jpg' },
  ],
  process: [
    { step: '01', title: 'On-Site Review', desc: 'We assess layout, moisture-prone areas, and the upgrades that will make the bathroom more comfortable.' },
    { step: '02', title: 'Scope & Selections', desc: 'You receive a quote and guidance on tile, vanity, fixture, and finish choices that fit your goals.' },
    { step: '03', title: 'Remodel Buildout', desc: 'We manage demolition, prep, installations, and finish work in a logical sequence to reduce disruption.' },
    { step: '04', title: 'Punch List & Handoff', desc: 'We review the finished bathroom together and wrap up details before the job is considered complete.' },
  ],
  faqs: [
    { q: 'What bathroom projects do you take on?', a: 'We handle vanity replacements, tub and shower upgrades, tile work, fixture updates, and full bathroom remodels throughout Salt Lake County.' },
    { q: 'Can you update a bathroom without changing the layout?', a: 'Yes. Many bathroom remodels focus on tile, vanities, fixtures, and finishes while keeping plumbing locations in place.' },
    { q: 'How do you protect against moisture issues?', a: 'We use proper prep, waterproofing methods where needed, and finish materials selected for bathroom conditions.' },
    { q: 'How long does a bathroom remodel take?', a: 'Smaller bathroom updates can move quickly, while full remodels take longer based on tile work, layout changes, and material availability.' },
  ],
}

export const bathroomMetadata = createMetadata(
  'Bathroom Remodeling in Salt Lake County, UT',
  'Bathroom remodeling in Salt Lake County, UT with tile, vanity, shower, tub, and fixture upgrades built to last.',
  ['bathroom remodeling Salt Lake County', 'bathroom contractor Utah', 'tile vanity shower remodel']
)

export const bathroomSchema = createServiceSchema(
  'Bathroom Remodeling',
  'Bathroom remodeling services including tile, vanities, showers, tubs, and fixtures in Salt Lake County, Utah.',
  'Bathroom Remodeling',
  '/services/remodel/bathroom'
)

export const basementContent: ServiceDetailContent = {
  title: 'Basement Finishing',
  description:
    'Turn unfinished basement space into comfortable living areas with framing, drywall, flooring, trim, and code-conscious planning.',
  eyebrow: 'REMODEL SERVICES',
  sectionTitle: 'Basement Finishing Services',
  sectionDescription:
    'We help homeowners unlock more square footage with practical basement finishing built around comfort, access, and long-term use.',
  ctaLabel: 'Get a Free Estimate',
  serviceItems: [
    { icon: 'bi-layout-three-columns', title: 'Framing & Layout', desc: 'Build rooms, storage zones, and open living areas with a layout that makes the basement feel intentional.', img: '/images/drywall-construction.jpg' },
    { icon: 'bi-shield-check', title: 'Insulation Planning', desc: 'Improve comfort with basement wall and ceiling prep that supports a more finished, livable environment.', img: '/images/drywall-construction.jpg' },
    { icon: 'bi-grid-3x3', title: 'Drywall & Texture', desc: 'Hang, finish, and texture walls and ceilings so the basement blends with the rest of your home.', img: '/images/drywall-install.jpg' },
    { icon: 'bi-grid-3x2-gap', title: 'Flooring Installation', desc: 'Install flooring suited to basement conditions, from LVP to carpet and other durable finished surfaces.', img: '/images/kitchen-modern.jpg' },
    { icon: 'bi-door-open', title: 'Egress Considerations', desc: 'Plan around bedroom conversions and access requirements so the finished space is safe and functional.', img: '/images/drywall-construction.jpg' },
    { icon: 'bi-lightbulb', title: 'Trim & Lighting', desc: 'Add baseboards, doors, recessed lighting, and finishing touches that make the space feel move-in ready.', img: '/images/drywall-ceiling.jpg' },
  ],
  process: [
    { step: '01', title: 'Space Assessment', desc: 'We review the basement layout, ceiling height, utilities, and the best use for the available square footage.' },
    { step: '02', title: 'Finishing Plan', desc: 'You get a clear scope covering framing, surfaces, flooring, and the details needed for a polished finished basement.' },
    { step: '03', title: 'Build Sequence', desc: 'We coordinate framing, drywall, flooring, and trim in the right order to keep quality high from start to finish.' },
    { step: '04', title: 'Walkthrough', desc: 'Before wrapping up, we confirm the basement is ready for everyday use and address final details together.' },
  ],
  faqs: [
    { q: 'What can you turn a basement into?', a: 'Basements can become family rooms, guest spaces, offices, bedrooms, gyms, or multipurpose living areas depending on the layout and goals.' },
    { q: 'Do you handle basement bedrooms and egress planning?', a: 'Yes. We plan around access and egress needs when the project includes bedrooms or code-sensitive layout changes.' },
    { q: 'What flooring works best in a basement?', a: 'That depends on the space, moisture conditions, and how the room will be used. We help you choose a durable option for the environment.' },
    { q: 'How long does basement finishing take?', a: 'Timelines vary with square footage and scope, but we provide a realistic schedule after the walkthrough so you know what to expect.' },
  ],
}

export const basementMetadata = createMetadata(
  'Basement Finishing in Salt Lake County, UT',
  'Basement finishing in Salt Lake County, UT including framing, drywall, flooring, trim, and egress-conscious remodel work.',
  ['basement finishing Salt Lake County', 'basement remodel Utah', 'framing drywall flooring basement']
)

export const basementSchema = createServiceSchema(
  'Basement Finishing',
  'Basement finishing services including framing, drywall, flooring, and egress-conscious planning in Salt Lake County, Utah.',
  'Basement Remodeling',
  '/services/remodel/basement'
)

export const bedroomContent: ServiceDetailContent = {
  title: 'Bedroom Remodeling',
  description:
    'Improve bedrooms with closet builds, layout changes, trim upgrades, and polished finishes that make the space work better every day.',
  eyebrow: 'REMODEL SERVICES',
  sectionTitle: 'Bedroom Remodeling Services',
  sectionDescription:
    'We remodel bedrooms to create better storage, smoother layouts, and cleaner finishes without overcomplicating the project.',
  ctaLabel: 'Get a Free Estimate',
  serviceItems: [
    { icon: 'bi-door-closed', title: 'Closet Builds', desc: 'Build or rework closet storage so the room feels less cluttered and more functional.', img: '/images/painting-interior.jpg' },
    { icon: 'bi-arrows-angle-expand', title: 'Layout Adjustments', desc: 'Shift walls, openings, or room flow when a better layout makes the space more usable.', img: '/images/painting-room.jpg' },
    { icon: 'bi-border-width', title: 'Trim & Millwork', desc: 'Upgrade baseboards, casing, accent trim, and other finish carpentry that sharpens the room.', img: '/images/painting-interior.jpg' },
    { icon: 'bi-grid-1x2', title: 'Flooring Updates', desc: 'Install flooring that fits the room and ties it visually to adjacent spaces in the home.', img: '/images/kitchen-modern.jpg' },
    { icon: 'bi-lightbulb', title: 'Lighting Changes', desc: 'Add better fixture placement, switches, and lighting upgrades that improve comfort and function.', img: '/images/painting-room.jpg' },
    { icon: 'bi-brush', title: 'Paint & Finish Work', desc: 'Complete the remodel with smooth walls, crisp lines, and final paint details that elevate the room.', img: '/images/painting-accent-wall.jpg' },
  ],
  process: [
    { step: '01', title: 'Room Walkthrough', desc: 'We identify storage issues, layout limitations, and the finish upgrades that will have the biggest impact.' },
    { step: '02', title: 'Scope & Budget', desc: 'You receive a focused plan for the remodel with recommendations matched to the room and your budget.' },
    { step: '03', title: 'Construction & Finishes', desc: 'We complete framing, closet work, trim, flooring, and paint in a coordinated sequence.' },
    { step: '04', title: 'Final Touches', desc: 'We walk the bedroom with you, check details, and finish the punch list before signoff.' },
  ],
  faqs: [
    { q: 'Can you add or rework a closet in an existing bedroom?', a: 'Yes. Closet builds and storage improvements are a common part of bedroom remodels when the space needs better organization.' },
    { q: 'Do bedroom remodels have to be full renovations?', a: 'No. Many projects are targeted updates such as trim, flooring, paint, closets, or layout changes in part of the room.' },
    { q: 'Can bedroom remodels be matched to the rest of the home?', a: 'Absolutely. We plan finishes, trim profiles, flooring, and paint so the updated room feels consistent with nearby spaces.' },
    { q: 'Do you offer bedroom remodeling throughout Salt Lake County?', a: 'Yes. We serve homeowners across Salt Lake County, Utah, with bedroom remodel walkthroughs and detailed estimates.' },
  ],
}

export const bedroomMetadata = createMetadata(
  'Bedroom Remodeling in Salt Lake County, UT',
  'Bedroom remodeling in Salt Lake County, UT with closet builds, layout changes, trim upgrades, flooring, and finish work.',
  ['bedroom remodeling Salt Lake County', 'closet build contractor', 'bedroom layout changes Utah']
)

export const bedroomSchema = createServiceSchema(
  'Bedroom Remodeling',
  'Bedroom remodeling services including closet builds, layout changes, trim work, and finishes in Salt Lake County, Utah.',
  'Bedroom Remodeling',
  '/services/remodel/bedroom'
)

export const flooringContent: ServiceDetailContent = {
  title: 'Flooring Installation',
  description:
    'Install hardwood, LVP, tile, and carpet with careful prep so your new floors look sharp and hold up to daily traffic.',
  eyebrow: 'REMODEL SERVICES',
  sectionTitle: 'Flooring Installation Services',
  sectionDescription:
    'We handle flooring upgrades room by room or as part of a larger remodel, always with attention to prep and finish details.',
  ctaLabel: 'Get a Free Estimate',
  serviceItems: [
    { icon: 'bi-tree', title: 'Hardwood Flooring', desc: 'Install hardwood floors that bring warmth and long-term value to living spaces, bedrooms, and hallways.', img: '/images/kitchen-modern.jpg' },
    { icon: 'bi-grid', title: 'LVP Installation', desc: 'Luxury vinyl plank floors installed for durability, water resistance, and a clean modern finish.', img: '/images/kitchen-modern.jpg' },
    { icon: 'bi-grid-3x3-gap', title: 'Tile Flooring', desc: 'Tile floors laid with proper spacing, transitions, and substrate prep for bathrooms, kitchens, and entries.', img: '/images/bathroom-remodel.jpg' },
    { icon: 'bi-square', title: 'Carpet Installation', desc: 'Soft-surface flooring installed for comfort in bedrooms, basements, and other lower-traffic spaces.', img: '/images/painting-interior.jpg' },
    { icon: 'bi-hammer', title: 'Subfloor Preparation', desc: 'Leveling, patching, and prep work that helps finished floors perform better and last longer.', img: '/images/drywall-construction.jpg' },
    { icon: 'bi-border-style', title: 'Transitions & Base', desc: 'Clean edges, transition strips, and base trim details that make the installation look complete.', img: '/images/kitchen-modern.jpg' },
  ],
  process: [
    { step: '01', title: 'Measure & Inspect', desc: 'We review the space, existing floor conditions, and the right material for the rooms being updated.' },
    { step: '02', title: 'Material & Scope', desc: 'You receive installation guidance, prep notes, and a clear estimate for the flooring work.' },
    { step: '03', title: 'Prep & Install', desc: 'We prepare the surface, complete the installation, and keep the project moving efficiently.' },
    { step: '04', title: 'Finish Review', desc: 'We check transitions, trim, and overall appearance so the new flooring is ready for everyday use.' },
  ],
  faqs: [
    { q: 'What types of flooring do you install?', a: 'We install hardwood, luxury vinyl plank, tile, carpet, and other flooring options depending on the room and project goals.' },
    { q: 'Do you handle flooring as part of larger remodels?', a: 'Yes. Flooring upgrades are often bundled into kitchen, bathroom, bedroom, and basement projects for a cohesive finish.' },
    { q: 'Why is subfloor prep important?', a: 'Proper prep helps the finished flooring sit flatter, wear better, and avoid avoidable issues after installation.' },
    { q: 'Can you help choose the right flooring for each room?', a: 'Absolutely. We help you weigh durability, moisture exposure, feel underfoot, and visual style before installation.' },
  ],
}

export const flooringMetadata = createMetadata(
  'Flooring Installation in Salt Lake County, UT',
  'Flooring installation in Salt Lake County, UT for hardwood, LVP, tile, and carpet with proper prep and finishing.',
  ['flooring contractor Salt Lake County', 'hardwood LVP tile carpet installation', 'flooring installation Utah']
)

export const flooringSchema = createServiceSchema(
  'Flooring Installation',
  'Flooring installation services for hardwood, LVP, tile, and carpet in Salt Lake County, Utah.',
  'Flooring Installation',
  '/services/remodel/flooring'
)

export const paintContent: ServiceDetailContent = {
  title: 'Painting Services',
  description:
    'Interior and exterior painting, cabinet refinishing, accent walls, and color guidance for clean, durable finished spaces.',
  eyebrow: 'RESTORE SERVICES',
  sectionTitle: 'Painting Services',
  sectionDescription:
    'We handle every type of painting project with the same level of care, prep, and finish quality.',
  ctaLabel: 'Get a Free Estimate',
  serviceItems: [
    { icon: 'bi-house', title: 'Interior Painting', desc: 'Walls, ceilings, trim, and doors painted to a professional standard with careful prep and protection.', img: '/images/painting-room.jpg' },
    { icon: 'bi-sun', title: 'Exterior Painting', desc: 'Weather-ready finishes that protect siding, trim, and other exterior surfaces while boosting curb appeal.', img: '/images/home-exterior.jpg' },
    { icon: 'bi-grid', title: 'Cabinet Painting', desc: 'Refresh kitchen and bathroom cabinets with a durable process that delivers a clean, updated look.', img: '/images/kitchen-cabinets.jpg' },
    { icon: 'bi-palette', title: 'Color Consultation', desc: 'Get help choosing colors that fit your lighting, materials, and the style of your home.', img: '/images/painting-interior.jpg' },
    { icon: 'bi-columns', title: 'Accent Walls', desc: 'Add contrast, depth, or personality with accent wall planning and precise finish work.', img: '/images/painting-accent-wall.jpg' },
    { icon: 'bi-building', title: 'Commercial Painting', desc: 'Professional painting for offices, retail spaces, and light commercial interiors on a practical schedule.', img: '/images/painting-roller.jpg' },
  ],
  process: [
    { step: '01', title: 'Walkthrough & Scope', desc: 'We inspect surfaces, discuss colors, and identify the prep work needed for a sharp finished result.' },
    { step: '02', title: 'Prep & Protection', desc: 'Furniture, floors, trim, and surrounding surfaces are protected before sanding, caulking, and patching begin.' },
    { step: '03', title: 'Paint Application', desc: 'We apply the right primers and finish coats for the surface, sheen, and level of durability your project needs.' },
    { step: '04', title: 'Final Touchups', desc: 'We review coverage, straighten final details, and leave the space clean and ready to use.' },
  ],
  faqs: [
    { q: 'How long does an interior painting project take?', a: 'Single-room painting can often be completed quickly, while whole-home interiors take longer depending on prep, coats, and square footage.' },
    { q: 'Do I need to move my furniture before painting starts?', a: 'We ask clients to move smaller valuables. We help with larger items as needed and protect floors and nearby surfaces throughout the job.' },
    { q: 'Do you offer color consultation?', a: 'Yes. We can help you select colors and finishes that make sense for your space, lighting, and overall design goals.' },
    { q: 'Do you paint cabinets too?', a: 'Absolutely. Cabinet painting is one of our specialties and a great way to refresh kitchens and bathrooms without a full replacement.' },
  ],
}

export const paintMetadata = createMetadata(
  'Painting Services in Salt Lake County, UT',
  'Painting services in Salt Lake County, UT for interiors, exteriors, cabinets, accent walls, and color consultation.',
  ['painting contractor Salt Lake County', 'interior painting', 'cabinet painting', 'exterior painting Utah']
)

export const paintSchema = createServiceSchema(
  'Painting Services',
  'Interior and exterior painting, cabinet refinishing, and color consultation in Salt Lake County, Utah.',
  'Painting',
  '/services/restore/paint'
)

export const drywallContent: ServiceDetailContent = {
  title: 'Drywall Services',
  description:
    'Drywall installation, repair, texture matching, skim coating, and ceiling work for seamless finished walls and ceilings.',
  eyebrow: 'RESTORE SERVICES',
  sectionTitle: 'Drywall Services',
  sectionDescription:
    'From hairline cracks to full-room installs, we handle drywall work of every size with an eye for invisible repairs.',
  ctaLabel: 'Get a Free Estimate',
  serviceItems: [
    { icon: 'bi-plus-square', title: 'New Installation', desc: 'Full drywall installation for room conversions, additions, and new framed spaces.', img: '/images/drywall-install.jpg' },
    { icon: 'bi-tools', title: 'Drywall Repair', desc: 'Repair holes, cracks, and damaged areas so they blend into the surrounding wall or ceiling.', img: '/images/drywall-construction.jpg' },
    { icon: 'bi-droplet', title: 'Water Damage Repair', desc: 'Replace affected drywall after leaks or flooding and prep the surface for texture and paint.', img: '/images/drywall-install.jpg' },
    { icon: 'bi-grid-3x3-gap', title: 'Texture Matching', desc: 'Match orange peel, knockdown, skip trowel, and other existing wall textures as closely as possible.', img: '/images/drywall-construction.jpg' },
    { icon: 'bi-layers', title: 'Skim Coating', desc: 'Smooth rough or dated surfaces with skim coating for a cleaner, more modern finished wall.', img: '/images/drywall-ceiling.jpg' },
    { icon: 'bi-square', title: 'Ceiling Work', desc: 'Install and repair ceiling drywall, including texture repair and smoothing for damaged areas.', img: '/images/drywall-ceiling.jpg' },
  ],
  process: [
    { step: '01', title: 'Inspect the Damage', desc: 'We look at the repair area, identify the extent of the work, and note any conditions affecting the finish.' },
    { step: '02', title: 'Prep & Protect', desc: 'Floors and nearby surfaces are protected before damaged material is removed or new drywall is hung.' },
    { step: '03', title: 'Repair & Finish', desc: 'We hang, tape, mud, sand, and texture the area so it is ready for primer and paint.' },
    { step: '04', title: 'Final Blend Check', desc: 'Before wrapping up, we review the texture, edges, and overall appearance to make sure the repair blends well.' },
  ],
  faqs: [
    { q: 'Can you match my existing wall texture?', a: 'Yes. Texture matching is a core part of our drywall work, including orange peel, knockdown, skip trowel, and similar finishes.' },
    { q: 'How long does a drywall repair take?', a: 'Small repairs can move quickly, while larger patches or replacements take longer because multiple coats need time to dry between steps.' },
    { q: 'Do you handle drywall damaged by leaks?', a: 'Yes. Once the source issue is addressed, we remove damaged material, replace it, and restore the finish so the area is ready for paint.' },
    { q: 'Can painting be included after drywall work?', a: 'Yes. Painting can be added so repaired areas blend more cleanly with the rest of the room once the drywall work is complete.' },
  ],
}

export const drywallMetadata = createMetadata(
  'Drywall Services in Salt Lake County, UT',
  'Drywall services in Salt Lake County, UT including repair, installation, texture matching, skim coating, and ceiling work.',
  ['drywall contractor Salt Lake County', 'drywall repair', 'texture matching', 'water damage drywall repair']
)

export const drywallSchema = createServiceSchema(
  'Drywall Services',
  'Drywall installation, repair, texture matching, and skim coating in Salt Lake County, Utah.',
  'Drywall',
  '/services/restore/drywall'
)

export const waterDamageContent: ServiceDetailContent = {
  title: 'Water Damage Restoration',
  description:
    'Restore interiors after leaks or water intrusion with damage assessment, selective demo, drywall replacement, texture, and paint.',
  eyebrow: 'RESTORE SERVICES',
  sectionTitle: 'Water Damage Restoration Services',
  sectionDescription:
    'We help homeowners recover from interior water damage by removing compromised finishes and rebuilding the space cleanly.',
  ctaLabel: 'Get a Free Estimate',
  serviceItems: [
    { icon: 'bi-search', title: 'Damage Assessment', desc: 'Review affected walls, ceilings, and finishes to understand the visible repair scope after the source is addressed.', img: '/images/drywall-install.jpg' },
    { icon: 'bi-hammer', title: 'Selective Demo', desc: 'Remove damaged drywall, trim, and other compromised materials without disturbing more of the room than necessary.', img: '/images/drywall-construction.jpg' },
    { icon: 'bi-grid-3x3', title: 'Drywall Replacement', desc: 'Install new drywall where needed and prep the repaired areas for finishing and texture.', img: '/images/drywall-install.jpg' },
    { icon: 'bi-bricks', title: 'Texture Restoration', desc: 'Recreate the surrounding wall or ceiling texture so new work blends with existing surfaces.', img: '/images/drywall-construction.jpg' },
    { icon: 'bi-brush', title: 'Prime & Paint', desc: 'Prime repaired areas and finish with paint so the room looks whole again once restoration is complete.', img: '/images/painting-room.jpg' },
    { icon: 'bi-house-check', title: 'Finish Coordination', desc: 'Reinstall trim and complete final detail work so the repaired space is ready to return to normal use.', img: '/images/drywall-ceiling.jpg' },
  ],
  process: [
    { step: '01', title: 'Review the Area', desc: 'We inspect the visible damage and confirm the affected space is ready for repair work to begin.' },
    { step: '02', title: 'Remove Damaged Material', desc: 'Compromised drywall and finishes are selectively removed so the rebuild starts on solid material.' },
    { step: '03', title: 'Rebuild & Refinish', desc: 'We replace drywall, match texture, and complete finish work needed to restore the room.' },
    { step: '04', title: 'Final Restoration Check', desc: 'We review the repaired area with you and make sure the room is clean, finished, and ready to use again.' },
  ],
  faqs: [
    { q: 'What parts of water damage repair do you handle?', a: 'We focus on interior restoration work such as selective demolition, drywall replacement, texture matching, trim, and paint after the source issue has been addressed.' },
    { q: 'Can you make the repaired area match the rest of the room?', a: 'Yes. Our goal is to blend drywall, texture, and paint repairs so the finished area looks consistent with the surrounding space.' },
    { q: 'Do you repaint after water damage repairs?', a: 'Yes. Priming and paint restoration can be included so the repaired surfaces do not stand out from the rest of the room.' },
    { q: 'Do you provide water damage restoration across Salt Lake County?', a: 'Yes. We serve homeowners throughout Salt Lake County, Utah, with walkthroughs and estimates for interior restoration projects.' },
  ],
}

export const waterDamageMetadata = createMetadata(
  'Water Damage Restoration in Salt Lake County, UT',
  'Water damage restoration in Salt Lake County, UT including assessment, selective demo, drywall replacement, texture, and paint.',
  ['water damage restoration Salt Lake County', 'drywall water damage repair', 'interior restoration contractor']
)

export const waterDamageSchema = createServiceSchema(
  'Water Damage Restoration',
  'Water damage restoration services including assessment, selective demolition, drywall repair, texture matching, and paint in Salt Lake County, Utah.',
  'Water Damage Restoration',
  '/services/restore/water-damage'
)

export const demoContent: ServiceDetailContent = {
  title: 'Demolition Services',
  description:
    'Interior demolition, selective demo, debris removal, and site prep for remodel-ready spaces across Salt Lake County.',
  eyebrow: 'DEMO SERVICES',
  sectionTitle: 'Demolition Services',
  sectionDescription:
    'We perform controlled interior demo work that clears the way for renovation while protecting the rest of your home.',
  ctaLabel: 'Get a Free Estimate',
  serviceItems: [
    { icon: 'bi-house-dash', title: 'Interior Demo', desc: 'Remove walls, cabinets, flooring, and finishes that need to come out before remodeling can begin.', img: '/images/drywall-construction.jpg' },
    { icon: 'bi-scissors', title: 'Selective Demo', desc: 'Targeted demolition for kitchens, bathrooms, basements, and other spaces where only part of the room is changing.', img: '/images/drywall-install.jpg' },
    { icon: 'bi-trash3', title: 'Debris Removal', desc: 'Haul away demolition debris so the site stays cleaner and the next phase of work can start faster.', img: '/images/contractor-worker.jpg' },
    { icon: 'bi-cone-striped', title: 'Site Preparation', desc: 'Prep the work area for framing, drywall, flooring, or finish crews after demolition is complete.', img: '/images/contractor-worker.jpg' },
    { icon: 'bi-shield', title: 'Dust & Surface Protection', desc: 'Use practical containment and protection measures to reduce mess in nearby areas of the home.', img: '/images/drywall-construction.jpg' },
    { icon: 'bi-layout-text-window', title: 'Remodel Readiness', desc: 'Leave the space stripped, organized, and ready for the next construction step without unnecessary delays.', img: '/images/contractor-worker.jpg' },
  ],
  process: [
    { step: '01', title: 'Scope the Demo', desc: 'We identify what stays, what goes, and how to protect surrounding spaces before work begins.' },
    { step: '02', title: 'Protect & Isolate', desc: 'We set up floor protection, dust control, and access plans to keep the work area contained.' },
    { step: '03', title: 'Complete Removal', desc: 'Materials are removed in a controlled sequence so the site remains safer and easier to manage.' },
    { step: '04', title: 'Clear for Next Trade', desc: 'Debris is removed and the site is left ready for the remodel, restoration, or finish work that follows.' },
  ],
  faqs: [
    { q: 'What types of demolition do you handle?', a: 'We handle interior and selective demolition for remodel-focused projects such as kitchens, bathrooms, basements, flooring removal, and other non-structural tear-outs.' },
    { q: 'Can demo be scheduled as a standalone service?', a: 'Yes. Demolition can be booked on its own when you need a space cleared before another phase of work starts.' },
    { q: 'Do you remove debris after demo?', a: 'Yes. Debris removal is part of keeping the project area manageable and ready for the next stage.' },
    { q: 'Do you offer demolition services throughout Salt Lake County?', a: 'Yes. Snel Remodeling Services provides demolition walkthroughs and estimates for projects across Salt Lake County, Utah.' },
  ],
}

export const demoMetadata = createMetadata(
  'Demolition Contractor in Salt Lake County, UT',
  'Demolition contractor in Salt Lake County, UT for interior demo, selective demo, debris removal, and remodel site prep.',
  ['demolition contractor Salt Lake County', 'interior demo', 'selective demolition', 'debris removal Utah']
)

export const demoSchema = createServiceSchema(
  'Demolition Services',
  'Interior demolition, selective demolition, debris removal, and site preparation in Salt Lake County, Utah.',
  'Demolition',
  '/services/demo'
)
