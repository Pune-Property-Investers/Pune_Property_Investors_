import {PinIcon} from '@sanity/icons/Pin'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const locationType = defineType({
  name: 'location',
  title: 'Locality / Area',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Locality Name',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'e.g. Kharadi, Baner, Wakad, Hinjewadi, Balewadi, Bavdhan',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Short Tagline',
      type: 'string',
      description: 'e.g. "Pune\'s Prime Eastern IT Hub" or "Premium Western Suburb"',
    }),
    defineField({
      name: 'description',
      title: 'Overview of Locality',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Locality Cover Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
    defineField({
      name: 'averagePrice',
      title: 'Average Price per Sq. Ft.',
      type: 'string',
      description: 'e.g. "₹8,500 - 12,000 / sq.ft."',
    }),
    defineField({
      name: 'connectivityHighlights',
      title: 'Connectivity & Nearby Landmarks',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {
        layout: 'tags',
      },
      description: 'e.g. Metro Line 3, Mumbai-Pune Expressway, EON IT Park, Phoenix Marketcity',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Locality (Show on Homepage)',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'tagline',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Untitled Locality',
        subtitle: subtitle || 'Pune Locality',
        media,
      }
    },
  },
})

