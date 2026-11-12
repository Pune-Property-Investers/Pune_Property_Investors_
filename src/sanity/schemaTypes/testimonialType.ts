import {CommentIcon} from '@sanity/icons/Comment'
import {defineField, defineType} from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Client Review / Testimonial',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'e.g. Rahul Deshmukh',
    }),
    defineField({
      name: 'designation',
      title: 'Designation / Profession',
      type: 'string',
      description: 'e.g. Senior Software Architect at Infosys',
    }),
    defineField({
      name: 'location',
      title: 'Location / Property Bought',
      type: 'string',
      description: 'e.g. Bought 3 BHK in Baner, Pune',
    }),
    defineField({
      name: 'rating',
      title: 'Star Rating (1 to 5)',
      type: 'number',
      initialValue: 5,
      validation: (rule) => rule.required().min(1).max(5),
    }),
    defineField({
      name: 'quote',
      title: 'Review / Testimonial Text',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'avatar',
      title: 'Client Photo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'featured',
      title: 'Featured (Show on Homepage)',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'clientName',
      subtitle: 'location',
      media: 'avatar',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Anonymous Client',
        subtitle: subtitle || 'Customer Review',
        media,
      }
    },
  },
})

