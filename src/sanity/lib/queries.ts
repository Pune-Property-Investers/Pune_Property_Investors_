import { groq } from 'next-sanity'

// ── Properties Queries ────────────────────────────────────────────────────────
export const PROPERTIES_QUERY = groq`
  *[_type == "property"] | order(featured desc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    projectName,
    propertyType,
    purpose,
    price,
    priceLabel,
    pricePerSqFt,
    bhk,
    bedrooms,
    bathrooms,
    area,
    location,
    city,
    possession,
    furnishing,
    featured,
    verified,
    badge,
    reraId,
    "image": mainImage.asset->url,
    "gallery": gallery[].asset->url,
    amenities,
    description,
    "locality": locality->{ name, "slug": slug.current }
  }
`

export const FEATURED_PROPERTIES_QUERY = groq`
  *[_type == "property" && featured == true] | order(_createdAt desc) [0...6] {
    _id,
    title,
    "slug": slug.current,
    projectName,
    propertyType,
    purpose,
    price,
    priceLabel,
    bhk,
    bedrooms,
    bathrooms,
    area,
    location,
    city,
    possession,
    featured,
    verified,
    badge,
    "image": mainImage.asset->url,
    amenities
  }
`

export const PROPERTY_BY_SLUG_QUERY = groq`
  *[_type == "property" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    projectName,
    propertyType,
    purpose,
    price,
    priceLabel,
    pricePerSqFt,
    bhk,
    bedrooms,
    bathrooms,
    area,
    location,
    city,
    possession,
    furnishing,
    featured,
    verified,
    badge,
    reraId,
    "image": mainImage.asset->url,
    "gallery": gallery[].asset->url,
    amenities,
    description,
    "locality": locality->{ name, "slug": slug.current }
  }
`

// ── Projects Queries ──────────────────────────────────────────────────────────
export const PROJECTS_QUERY = groq`
  *[_type == "project"] | order(featured desc, _createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    developer,
    "developerLogo": developerLogo.asset->url,
    location,
    startingPrice,
    priceValue,
    configuration,
    area,
    status,
    possession,
    reraId,
    featured,
    trending,
    newLaunch,
    badge,
    "image": mainImage.asset->url,
    "gallery": gallery[].asset->url,
    "brochureUrl": brochure.asset->url,
    amenities,
    description,
    "locality": locality->{ name, "slug": slug.current }
  }
`

export const PROJECT_BY_SLUG_QUERY = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    developer,
    "developerLogo": developerLogo.asset->url,
    location,
    startingPrice,
    priceValue,
    configuration,
    area,
    status,
    possession,
    reraId,
    featured,
    trending,
    newLaunch,
    badge,
    "image": mainImage.asset->url,
    "gallery": gallery[].asset->url,
    "brochureUrl": brochure.asset->url,
    amenities,
    description,
    "locality": locality->{ name, "slug": slug.current }
  }
`

// ── Locations Queries ─────────────────────────────────────────────────────────
export const LOCATIONS_QUERY = groq`
  *[_type == "location"] | order(featured desc, name asc) {
    _id,
    name,
    "slug": slug.current,
    tagline,
    description,
    "image": image.asset->url,
    averagePrice,
    connectivityHighlights,
    featured
  }
`

// ── Blog / Post Queries ───────────────────────────────────────────────────────
export const POSTS_QUERY = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    "image": mainImage.asset->url,
    "author": author->{ name, "image": image.asset->url, bio },
    "categories": categories[]->{ title, "slug": slug.current }
  }
`

export const POST_BY_SLUG_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    "image": mainImage.asset->url,
    "author": author->{ name, "image": image.asset->url, bio },
    "categories": categories[]->{ title, "slug": slug.current },
    body
  }
`

// ── Testimonials Queries ──────────────────────────────────────────────────────
export const TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial" && featured == true] | order(_createdAt desc) {
    _id,
    clientName,
    designation,
    location,
    rating,
    quote,
    "avatar": avatar.asset->url
  }
`

