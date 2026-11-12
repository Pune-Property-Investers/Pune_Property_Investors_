import {CaseIcon} from '@sanity/icons/Case'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Project Name',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'e.g. Godrej Rivergreens, Pride World City, Kohinoor Viva City',
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
      name: 'developer',
      title: 'Developer / Builder Name',
      type: 'string',
      description: 'e.g. Godrej Properties, Kolte Patil, VTP Realty',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'developerLogo',
      title: 'Developer Logo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'location',
      title: 'Project Location',
      type: 'string',
      description: 'e.g. Hinjewadi Phase 1, Pune or Kharadi Annex, Pune',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'locality',
      title: 'Locality',
      type: 'reference',
      to: [{type: 'location'}],
    }),
    defineField({
      name: 'startingPrice',
      title: 'Price Range / Starting Price',
      type: 'string',
      description: 'e.g. "₹ 75 Lakh - 1.45 Cr" or "Starting ₹ 85 Lakh*"',
    }),
    defineField({
      name: 'priceValue',
      title: 'Starting Price (Numeric INR for Sorting)',
      type: 'number',
      description: 'e.g. 7500000',
    }),
    defineField({
      name: 'configuration',
      title: 'Configurations Offered',
      type: 'string',
      description: 'e.g. "2 & 3 BHK Luxury Apartments", "3 & 4 BHK Duplex / Villas"',
    }),
    defineField({
      name: 'area',
      title: 'Carpet Area Range',
      type: 'string',
      description: 'e.g. "750 - 1,450 sq.ft."',
    }),
    defineField({
      name: 'status',
      title: 'Construction / Launch Status',
      type: 'string',
      options: {
        list: [
          {title: 'New Launch', value: 'New Launch'},
          {title: 'Under Construction', value: 'Under Construction'},
          {title: 'Ready to Move', value: 'Ready to Move'},
        ],
      },
      initialValue: 'New Launch',
    }),
    defineField({
      name: 'possession',
      title: 'Possession Timeline',
      type: 'string',
      description: 'e.g. "Dec 2026", "Mid 2027", "Ready to Move"',
    }),
    defineField({
      name: 'reraId',
      title: 'MahaRERA Registration Number',
      type: 'string',
      description: 'e.g. P52100051240',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'trending',
      title: 'Trending Project',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'newLaunch',
      title: 'New Launch Project',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'badge',
      title: 'Project Badge',
      type: 'string',
      description: 'e.g. "Trending", "Featured", "Pre-Launch Offers"',
    }),
    defineField({
      name: 'mainImage',
      title: 'Project Elevation / Hero Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Project Photos & Renderings',
      type: 'array',
      of: [
        defineArrayMember({
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
      ],
    }),
    defineField({
      name: 'brochure',
      title: 'Project Brochure (PDF)',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities / Project Features',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'description',
      title: 'Project Overview / Description',
      type: 'text',
      rows: 5,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'developer',
      media: 'mainImage',
      location: 'location',
    },
    prepare({title, subtitle, media, location}) {
      return {
        title: title || 'Untitled Project',
        subtitle: [subtitle, location].filter(Boolean).join(' • '),
        media,
      }
    },
  },
})

