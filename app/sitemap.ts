import type { MetadataRoute } from 'next'

const BASE_URL = 'https://snelremodeling.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    { url: `${BASE_URL}`,                                 lastModified: now, changeFrequency: 'monthly',  priority: 1.0 },
    { url: `${BASE_URL}/about`,                           lastModified: now, changeFrequency: 'monthly',  priority: 0.7 },
    { url: `${BASE_URL}/contact`,                         lastModified: now, changeFrequency: 'monthly',  priority: 0.8 },
    { url: `${BASE_URL}/gallery`,                         lastModified: now, changeFrequency: 'monthly',  priority: 0.7 },

    // Remodel
    { url: `${BASE_URL}/services/remodel/kitchen`,        lastModified: now, changeFrequency: 'monthly',  priority: 0.9 },
    { url: `${BASE_URL}/services/remodel/bathroom`,       lastModified: now, changeFrequency: 'monthly',  priority: 0.9 },
    { url: `${BASE_URL}/services/remodel/basement`,       lastModified: now, changeFrequency: 'monthly',  priority: 0.9 },
    { url: `${BASE_URL}/services/remodel/bedroom`,        lastModified: now, changeFrequency: 'monthly',  priority: 0.8 },
    { url: `${BASE_URL}/services/remodel/flooring`,       lastModified: now, changeFrequency: 'monthly',  priority: 0.8 },

    // Restore
    { url: `${BASE_URL}/services/restore/paint`,          lastModified: now, changeFrequency: 'monthly',  priority: 0.9 },
    { url: `${BASE_URL}/services/restore/drywall`,        lastModified: now, changeFrequency: 'monthly',  priority: 0.9 },
    { url: `${BASE_URL}/services/restore/water-damage`,   lastModified: now, changeFrequency: 'monthly',  priority: 0.8 },

    // Demo
    { url: `${BASE_URL}/services/demo`,                   lastModified: now, changeFrequency: 'monthly',  priority: 0.8 },
  ]
}
