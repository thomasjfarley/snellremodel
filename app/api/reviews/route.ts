interface PlaceReview {
  author_name: string
  rating: number
  text: string
  relative_time_description: string
}

interface PlaceDetailsResult {
  result?: {
    reviews?: PlaceReview[]
  }
}

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID

  if (!apiKey || !placeId) {
    return Response.json({ reviews: [] })
  }

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    )

    if (!res.ok) throw new Error('Places API error')

    const data: PlaceDetailsResult = await res.json()

    const reviews = (data.result?.reviews ?? []).map((r) => ({
      author: r.author_name,
      rating: r.rating,
      text: r.text,
      time: r.relative_time_description,
    }))

    return Response.json({ reviews })
  } catch (err) {
    console.error('[/api/reviews]', err)
    return Response.json({ reviews: [] })
  }
}
