'use client'

import { useState } from 'react'
import Image from 'next/image'

type Category = 'All' | 'Paint' | 'Remodel' | 'Restore' | 'Demo'
type ProjectCategory = Exclude<Category, 'All'>
type Stage = 'Before' | 'During' | 'After' | 'Progress'

type Project = {
  title: string
  category: ProjectCategory
  city: string
  stage?: Stage
  desc: string
  img: string
  alt: string
}

const categories: Category[] = ['All', 'Paint', 'Remodel', 'Restore', 'Demo']

const stageBadgeClass: Record<Stage, string> = {
  Before: 'bg-secondary',
  During: 'bg-warning text-dark',
  After: 'bg-success',
  Progress: 'bg-info text-dark',
}

const projects: Project[] = [
  {
    title: "Smithy's Exterior Painting",
    category: 'Paint',
    city: 'Salt Lake City',
    stage: 'Before',
    desc: "Original exterior condition before prep and repainting at Smithy's property.",
    img: '/images/exterior-paint-salt-lake-city-before.jpg',
    alt: "Smithy's exterior painting before repainting in Salt Lake City, UT",
  },
  {
    title: "Smithy's Exterior Painting",
    category: 'Paint',
    city: 'Salt Lake City',
    stage: 'Before',
    desc: 'Additional before view showing siding and trim conditions before the exterior paint project.',
    img: '/images/exterior-paint-salt-lake-city-before-2.jpg',
    alt: 'Exterior painting before photo showing siding and trim in Salt Lake City, UT',
  },
  {
    title: "Smithy's Exterior Painting",
    category: 'Paint',
    city: 'Salt Lake City',
    stage: 'Before',
    desc: 'Street-side angle of the home before scraping, prep, and new exterior paint.',
    img: '/images/exterior-paint-salt-lake-city-before-3.jpg',
    alt: 'Before exterior paint view of Salt Lake City home prior to repainting',
  },
  {
    title: "Smithy's Exterior Painting",
    category: 'Paint',
    city: 'Salt Lake City',
    stage: 'During',
    desc: 'Exterior repaint in progress with prep and coatings underway.',
    img: '/images/exterior-paint-salt-lake-city-during.jpg',
    alt: 'Exterior paint job in progress at Salt Lake City home',
  },
  {
    title: "Smithy's Exterior Painting",
    category: 'Paint',
    city: 'Salt Lake City',
    stage: 'After',
    desc: 'Finished exterior repaint with refreshed siding, trim, and curb appeal.',
    img: '/images/exterior-paint-salt-lake-city-after.jpg',
    alt: 'Completed exterior house painting project in Salt Lake City, UT',
  },
  {
    title: "Smithy's Interior Painting",
    category: 'Paint',
    city: 'Salt Lake City',
    stage: 'After',
    desc: 'Clean interior finish work with updated walls and trim.',
    img: '/images/interior-paint-salt-lake-city-after.jpg',
    alt: 'Interior painting finish work inside Salt Lake City property',
  },
  {
    title: "Smithy's Entry Painting",
    category: 'Paint',
    city: 'Salt Lake City',
    desc: 'Freshly painted entry area with crisp lines and a polished look.',
    img: '/images/interior-paint-entry-salt-lake-city.jpg',
    alt: 'Freshly painted home entry in Salt Lake City, UT',
  },
  {
    title: 'Exterior Staining',
    category: 'Paint',
    city: 'Millcreek',
    stage: 'Before',
    desc: 'Exterior wood surfaces before staining and protective finishing.',
    img: '/images/exterior-staining-millcreek-before.jpg',
    alt: 'Exterior staining before photo at Millcreek home',
  },
  {
    title: 'Exterior Staining',
    category: 'Paint',
    city: 'Millcreek',
    stage: 'After',
    desc: 'Completed exterior stain highlighting renewed color and weather protection.',
    img: '/images/exterior-staining-millcreek-after.jpg',
    alt: 'Completed exterior wood staining project in Millcreek, UT',
  },
  {
    title: 'Cabinet Painting',
    category: 'Paint',
    city: 'South Jordan',
    stage: 'Before',
    desc: 'Cabinet surfaces before sanding, prep, and refinishing.',
    img: '/images/cabinet-painting-south-jordan-before.jpg',
    alt: 'Kitchen cabinet painting before refinishing in South Jordan, UT',
  },
  {
    title: 'Cabinet Painting',
    category: 'Paint',
    city: 'South Jordan',
    stage: 'After',
    desc: 'Updated cabinet finish with a cleaner, brighter painted look.',
    img: '/images/cabinet-painting-south-jordan-after.jpg',
    alt: 'Finished cabinet painting project in South Jordan, UT',
  },
  {
    title: 'Exterior Residential Painting',
    category: 'Paint',
    city: 'Herriman',
    stage: 'After',
    desc: 'Finished residential exterior repaint with refreshed siding and trim.',
    img: '/images/exterior-paint-herriman-after.jpg',
    alt: 'Completed residential exterior paint job in Herriman, UT',
  },
  {
    title: 'Exterior Residential Painting',
    category: 'Paint',
    city: 'Herriman',
    stage: 'After',
    desc: 'Alternate exterior angle showing finished paint color and detail work.',
    img: '/images/exterior-paint-herriman-after-2.jpg',
    alt: 'Finished house painting view from second angle in Herriman, UT',
  },
  {
    title: 'Exterior Residential Painting',
    category: 'Paint',
    city: 'Herriman',
    stage: 'After',
    desc: 'Completed exterior paint view showing strong coverage and clean trim lines.',
    img: '/images/exterior-paint-herriman-after-3.jpg',
    alt: 'Exterior repaint with clean trim lines in Herriman, UT',
  },
  {
    title: 'Exterior Residential Painting',
    category: 'Paint',
    city: 'Herriman',
    stage: 'After',
    desc: 'Finished facade highlighting curb appeal improvements after repainting.',
    img: '/images/exterior-paint-herriman-after-4.jpg',
    alt: 'Fresh exterior paint finish on Herriman home',
  },
  {
    title: 'Exterior Residential Painting',
    category: 'Paint',
    city: 'Herriman',
    stage: 'After',
    desc: 'Additional completed exterior view for the full residential paint project.',
    img: '/images/exterior-paint-herriman-after-5.jpg',
    alt: 'Completed exterior painting results at Herriman residence',
  },
  {
    title: 'Interior Painting',
    category: 'Paint',
    city: 'Murray',
    stage: 'After',
    desc: 'Fresh interior paint with smooth coverage and sharp finish details.',
    img: '/images/interior-paint-murray-after.jpg',
    alt: 'Interior painting results in Murray, UT with clean finished walls',
  },
  {
    title: 'Interior Painting',
    category: 'Paint',
    city: 'Murray',
    stage: 'After',
    desc: 'Second interior view showing consistent color and finish quality.',
    img: '/images/interior-paint-murray-after-2.jpg',
    alt: 'Second interior paint finish photo from Murray, UT project',
  },
  {
    title: 'Bathroom Remodel',
    category: 'Remodel',
    city: 'Millcreek',
    stage: 'Before',
    desc: 'Existing bathroom layout before demolition and finish upgrades.',
    img: '/images/bathroom-remodel-millcreek-before.jpg',
    alt: 'Bathroom remodel before photo in Millcreek, UT',
  },
  {
    title: 'Bathroom Remodel',
    category: 'Remodel',
    city: 'Millcreek',
    stage: 'After',
    desc: 'Finished bathroom remodel with updated surfaces and fixtures.',
    img: '/images/bathroom-remodel-millcreek-after.jpg',
    alt: 'Finished bathroom remodeling project in Millcreek, UT',
  },
  {
    title: 'Bathroom Remodel',
    category: 'Remodel',
    city: 'Millcreek',
    stage: 'After',
    desc: 'Second completed bathroom view showing additional detail work.',
    img: '/images/bathroom-remodel-millcreek-after-2.jpg',
    alt: 'Bathroom remodel after photo with upgraded finishes in Millcreek, UT',
  },
  {
    title: 'Bathroom Remodel',
    category: 'Remodel',
    city: 'Cottonwood Heights',
    stage: 'Before',
    desc: 'Bathroom before the remodel started, showing the original condition.',
    img: '/images/bathroom-remodel-cottonwood-heights-before.jpg',
    alt: 'Bathroom before remodeling in Cottonwood Heights, UT',
  },
  {
    title: 'Bathroom Remodel',
    category: 'Remodel',
    city: 'Cottonwood Heights',
    stage: 'During',
    desc: 'Bathroom remodel in progress with the space midway through transformation.',
    img: '/images/bathroom-remodel-cottonwood-heights-during.jpg',
    alt: 'Bathroom remodel in progress in Cottonwood Heights, UT',
  },
  {
    title: 'Bathroom Remodel',
    category: 'Remodel',
    city: 'Cottonwood Heights',
    stage: 'After',
    desc: 'Completed bathroom with updated finishes, fixtures, and layout.',
    img: '/images/bathroom-remodel-cottonwood-heights-after.jpg',
    alt: 'Completed bathroom remodel in Cottonwood Heights, UT',
  },
  {
    title: 'Bathroom Remodel',
    category: 'Remodel',
    city: 'Sandy',
    stage: 'Before',
    desc: 'Sandy bathroom before demolition and remodeling work.',
    img: '/images/bathroom-remodel-sandy-before.jpg',
    alt: 'Bathroom remodeling before photo in Sandy, UT',
  },
  {
    title: 'Bathroom Remodel',
    category: 'Remodel',
    city: 'Sandy',
    stage: 'After',
    desc: 'Finished bathroom remodel with upgraded materials and a cleaner layout.',
    img: '/images/bathroom-remodel-sandy-after.jpg',
    alt: 'Bathroom remodel after photo in Sandy, UT',
  },
  {
    title: 'Basement Remodel',
    category: 'Remodel',
    city: 'West Jordan',
    stage: 'After',
    desc: 'Finished basement remodel creating more livable square footage.',
    img: '/images/basement-remodel-west-jordan-after.jpg',
    alt: 'Completed basement remodel in West Jordan, UT',
  },
  {
    title: 'Basement Remodel',
    category: 'Remodel',
    city: 'West Jordan',
    stage: 'Progress',
    desc: 'Basement remodeling in progress during the build-out phase.',
    img: '/images/basement-remodel-west-jordan-progress.jpg',
    alt: 'Basement remodel in progress in West Jordan, UT',
  },
  {
    title: 'Basement Remodel',
    category: 'Remodel',
    city: 'Taylorsville',
    stage: 'After',
    desc: 'Additional finished basement project with completed remodel details.',
    img: '/images/basement-remodel-taylorsville-after.jpg',
    alt: 'Finished basement remodeling project in Taylorsville, UT',
  },
  {
    title: 'Garage Remodel',
    category: 'Remodel',
    city: 'Sandy',
    stage: 'Before',
    desc: 'Garage condition before the remodel and finish work began.',
    img: '/images/garage-remodel-sandy-before.jpg',
    alt: 'Garage remodel before photo in Sandy, UT',
  },
  {
    title: 'Garage Remodel',
    category: 'Remodel',
    city: 'Sandy',
    stage: 'Before',
    desc: 'Second before view documenting the original garage layout and materials.',
    img: '/images/garage-remodel-sandy-before-2.jpg',
    alt: 'Second garage remodel before photo in Sandy, UT',
  },
  {
    title: 'Garage Remodel',
    category: 'Remodel',
    city: 'Sandy',
    stage: 'Before',
    desc: 'Beginning stage of the garage remodel before major finish work.',
    img: '/images/garage-remodel-sandy-beginning.jpg',
    alt: 'Beginning phase of garage remodel in Sandy, UT',
  },
  {
    title: 'Garage Remodel',
    category: 'Remodel',
    city: 'Sandy',
    stage: 'During',
    desc: 'Garage remodel in progress as surfaces and structure were updated.',
    img: '/images/garage-remodel-sandy-during.jpg',
    alt: 'Garage remodel in progress in Sandy, UT',
  },
  {
    title: 'Garage Remodel',
    category: 'Remodel',
    city: 'Sandy',
    stage: 'During',
    desc: 'Additional in-progress garage remodel view during construction.',
    img: '/images/garage-remodel-sandy-during-2.jpg',
    alt: 'Second progress photo of Sandy garage remodel',
  },
  {
    title: 'Garage Remodel',
    category: 'Remodel',
    city: 'Sandy',
    stage: 'After',
    desc: 'Completed garage remodel with improved finishes and functionality.',
    img: '/images/garage-remodel-sandy-after.jpg',
    alt: 'Finished garage remodeling project in Sandy, UT',
  },
  {
    title: 'Garage Remodel',
    category: 'Remodel',
    city: 'Sandy',
    stage: 'After',
    desc: 'Finished garage view showing more of the completed transformation.',
    img: '/images/garage-remodel-sandy-after-2.jpg',
    alt: 'Garage remodel after photo showing completed finishes in Sandy, UT',
  },
  {
    title: 'Garage Remodel',
    category: 'Remodel',
    city: 'Sandy',
    stage: 'After',
    desc: 'Third completed garage angle with clean finish details.',
    img: '/images/garage-remodel-sandy-after-3.jpg',
    alt: 'Additional finished garage remodel image from Sandy, UT',
  },
  {
    title: 'Garage Remodel',
    category: 'Remodel',
    city: 'Sandy',
    stage: 'After',
    desc: 'Custom cedar wall detail completed as part of the garage remodel.',
    img: '/images/garage-remodel-sandy-cedar-wall.jpg',
    alt: 'Custom cedar wall detail from garage remodel in Sandy, UT',
  },
  {
    title: 'Garage Remodel',
    category: 'Remodel',
    city: 'Sandy',
    stage: 'After',
    desc: 'Second cedar wall detail view from the finished garage project.',
    img: '/images/garage-remodel-sandy-cedar-wall-2.jpg',
    alt: 'Second cedar wall finish photo from Sandy garage remodel',
  },
  {
    title: 'Laundry Room Remodel',
    category: 'Remodel',
    city: 'Taylorsville',
    stage: 'Before',
    desc: 'Laundry room before the remodel and organization upgrades.',
    img: '/images/laundry-room-remodel-taylorsville-before.jpg',
    alt: 'Laundry room remodel before photo in Taylorsville, UT',
  },
  {
    title: 'Laundry Room Remodel',
    category: 'Remodel',
    city: 'Taylorsville',
    stage: 'After',
    desc: 'Finished laundry room remodel with a cleaner, more usable layout.',
    img: '/images/laundry-room-remodel-taylorsville-after.jpg',
    alt: 'Completed laundry room remodel in Taylorsville, UT',
  },
  {
    title: 'Laundry Room Remodel',
    category: 'Remodel',
    city: 'Taylorsville',
    stage: 'After',
    desc: 'Second completed laundry room view with updated finishes.',
    img: '/images/laundry-room-remodel-taylorsville-after-2.jpg',
    alt: 'Laundry room remodel after photo with updated finishes in Taylorsville, UT',
  },
  {
    title: 'Home Remodel',
    category: 'Remodel',
    city: 'Salt Lake City',
    stage: 'Before',
    desc: 'Original condition before this larger home remodeling project.',
    img: '/images/home-remodel-salt-lake-city-before.jpg',
    alt: 'Home remodel before photo in Salt Lake City, UT',
  },
  {
    title: 'Home Remodel',
    category: 'Remodel',
    city: 'Salt Lake City',
    stage: 'During',
    desc: 'Home remodel in progress with major updates underway.',
    img: '/images/home-remodel-salt-lake-city-during.jpg',
    alt: 'Whole-home remodel in progress in Salt Lake City, UT',
  },
  {
    title: 'Home Remodel',
    category: 'Remodel',
    city: 'Salt Lake City',
    stage: 'After',
    desc: 'Finished home remodel with completed exterior and structural updates.',
    img: '/images/home-remodel-salt-lake-city-after.jpg',
    alt: 'Completed home remodeling project in Salt Lake City, UT',
  },
  {
    title: 'Commercial Framing',
    category: 'Remodel',
    city: 'Salt Lake City',
    stage: 'Progress',
    desc: 'Commercial framing work underway for a build-out project.',
    img: '/images/commercial-framing-salt-lake-city.jpg',
    alt: 'Commercial framing construction in Salt Lake City, UT',
  },
  {
    title: 'Commercial Framing',
    category: 'Remodel',
    city: 'Salt Lake City',
    stage: 'Progress',
    desc: 'Second framing view showing additional structural progress on-site.',
    img: '/images/commercial-framing-salt-lake-city-2.jpg',
    alt: 'Commercial framing progress photo from Salt Lake City, UT',
  },
  {
    title: 'Water Damage Repair',
    category: 'Restore',
    city: 'Draper',
    stage: 'Before',
    desc: 'Visible water damage before repairs and restoration began.',
    img: '/images/water-damage-repair-draper-before.jpg',
    alt: 'Water damage repair before photo in Draper, UT',
  },
  {
    title: 'Water Damage Repair',
    category: 'Restore',
    city: 'Draper',
    stage: 'During',
    desc: 'Restoration work in progress after damaged materials were opened up.',
    img: '/images/water-damage-repair-draper-during.jpg',
    alt: 'Water damage restoration in progress in Draper, UT',
  },
  {
    title: 'Water Damage Repair',
    category: 'Restore',
    city: 'Draper',
    stage: 'During',
    desc: 'Repaired interior with drywall and texture restoration in progress.',
    img: '/images/water-damage-repair-draper-after.jpg',
    alt: 'Water damage restoration in progress in Draper, UT',
  },
  {
    title: 'Water Damage Repair',
    category: 'Restore',
    city: 'Draper',
    stage: 'During',
    desc: 'Repair work continuing as damaged materials are replaced.',
    img: '/images/water-damage-repair-draper-after-2.jpg',
    alt: 'Water damage repair in progress, second view in Draper, UT',
  },
  {
    title: 'Water Damage Repair',
    category: 'Restore',
    city: 'Draper',
    stage: 'After',
    desc: 'Fully restored room with new drywall, texture, and window shutters.',
    img: '/images/water-damage-repair-draper-final.jpg',
    alt: 'Completed water damage repair with window shutters in Draper, UT',
  },
  {
    title: 'Drywall Repair',
    category: 'Restore',
    city: 'Holladay',
    stage: 'Before',
    desc: 'Damaged sheetrock before patching, finishing, and paint prep.',
    img: '/images/drywall-repair-holladay-before.jpg',
    alt: 'Drywall repair before photo in Holladay, UT',
  },
  {
    title: 'Drywall Repair',
    category: 'Restore',
    city: 'Holladay',
    stage: 'After',
    desc: 'Completed drywall repair with a cleaner finished surface.',
    img: '/images/drywall-repair-holladay-after.jpg',
    alt: 'Finished drywall repair in Holladay, UT',
  },
  {
    title: 'Carport Conversion',
    category: 'Remodel',
    city: 'Bountiful',
    stage: 'Before',
    desc: 'Original carport before conversion and structural updates.',
    img: '/images/carport-conversion-bountiful-before.jpg',
    alt: 'Carport conversion before photo in Bountiful, UT',
  },
  {
    title: 'Carport Conversion',
    category: 'Remodel',
    city: 'Bountiful',
    stage: 'During',
    desc: 'Framing stage of the carport conversion project.',
    img: '/images/carport-conversion-bountiful-framing.jpg',
    alt: 'Carport conversion framing in Bountiful, UT',
  },
  {
    title: 'Carport Conversion',
    category: 'Remodel',
    city: 'Bountiful',
    stage: 'Progress',
    desc: 'Conversion progress after framing and structural work advanced.',
    img: '/images/carport-conversion-bountiful-progress.jpg',
    alt: 'Carport conversion progress photo in Bountiful, UT',
  },
  {
    title: 'Carport Conversion',
    category: 'Remodel',
    city: 'Bountiful',
    stage: 'After',
    desc: 'Completed conversion with the project ready for everyday use.',
    img: '/images/carport-conversion-bountiful-after.jpg',
    alt: 'Completed carport conversion in Bountiful, UT',
  },
  {
    title: 'Exterior Demo',
    category: 'Demo',
    city: 'Riverton',
    stage: 'Before',
    desc: 'Exterior demolition before selective tear-out and prep work.',
    img: '/images/exterior-demo-riverton-before.jpg',
    alt: 'Exterior demolition before photo in Riverton, UT',
  },
  {
    title: 'Exterior Demo',
    category: 'Demo',
    city: 'Riverton',
    stage: 'During',
    desc: 'Exterior demo in progress as materials were removed for remodel prep.',
    img: '/images/exterior-demo-riverton-during.jpg',
    alt: 'Exterior demolition in progress in Riverton, UT',
  },
]

export default function GalleryGrid() {
  const [active, setActive] = useState<Category>('All')

  const filtered = active === 'All' ? projects : projects.filter((project) => project.category === active)

  return (
    <section className="section-pad">
      <div className="container">
        <div className="d-flex flex-wrap gap-2 mb-5">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActive(category)}
              className={`btn btn-sm px-4 ${
                active === category ? 'btn-primary' : 'btn-outline-secondary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="row g-4">
          {filtered.map((project) => (
            <div key={project.img} className="col-sm-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100 overflow-hidden service-card">
                <div className="ratio ratio-4x3 overflow-hidden">
                  <Image
                    src={project.img}
                    alt={project.alt}
                    fill
                    sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 33vw"
                    className="object-fit-cover"
                  />
                </div>
                <div className="card-body p-3">
                  <div className="d-flex flex-wrap gap-2 mb-2">
                    {project.stage && (
                      <span className={`badge ${stageBadgeClass[project.stage]}`}>{project.stage}</span>
                    )}
                    <span className="badge bg-light-warm text-navy">{project.category}</span>
                  </div>
                  <h3 className="h6 fw-bold text-navy mb-1">{project.title}</h3>
                  <p className="text-muted small mb-1">{project.city}, UT</p>
                  <p className="text-muted small mb-0">{project.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-muted text-center py-5">No projects in this category yet.</p>
        )}
      </div>
    </section>
  )
}
