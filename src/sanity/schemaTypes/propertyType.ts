import {HomeIcon} from '@sanity/icons/Home'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const propertyType = defineType({
  name: 'property',
  title: 'Property',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Property Title',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'e.g. Premium 2 BHK Apartment in Kharadi',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'projectName',
      title: 'Project / Society Name',
      type: 'string',
      description: 'e.g. Godrej Rivergreens, VTP Dolce Vita',
    }),
    defineField({
      name: 'propertyType',
      title: 'Property Type',
      type: 'string',
      options: {
        list: [
          {title: 'Apartment / Flat', value: 'Apartment'},
          {title: 'Villa / Bungalow', value: 'Villa'},
          {title: 'Penthouse', value: 'Penthouse'},
          {title: 'Residential Plot', value: 'Plot'},
          {title: 'Commercial Office', value: 'Commercial'},
          {title: 'Retail / Shop', value: 'Shop'},
        ],
      },
      initialValue: 'Apartment',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'purpose',
      title: 'Listing Purpose',
      type: 'string',
      options: {
        list: [
          {title: 'For Sale (Buy)', value: 'Buy'},
          {title: 'For Rent', value: 'Rent'},
        ],
      },
      initialValue: 'Buy',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (in Numeric INR)',
      type: 'number',
      description: 'Numeric value for filtering/sorting (e.g. 8500000 for 85 Lakhs)',
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: 'priceLabel',
      title: 'Price Display Label',
      type: 'string',
      description: 'Display string (e.g. "₹85 Lakh", "₹1.25 Cr", "Price on Request")',
    }),
    defineField({
      name: 'pricePerSqFt',
      title: 'Price per Sq. Ft. (₹)',
      type: 'number',
    }),
    defineField({
      name: 'bhk',
      title: 'BHK Configuration',
      type: 'number',
      description: 'e.g. 1, 2, 3, 4',
      options: {
        list: [1, 2, 3, 4, 5, 6],
      },
    }),
    defineField({
      name: 'bedrooms',
      title: 'Bedrooms',
      type: 'number',
    }),
    defineField({
      name: 'bathrooms',
      title: 'Bathrooms',
      type: 'number',
    }),
    defineField({
      name: 'area',
      title: 'Carpet / Built-up Area (sq. ft.)',
      type: 'number',
    }),
    defineField({
      name: 'location',
      title: 'Location / Full Address',
      type: 'string',
      description: 'e.g. Wakad, Pune or Near EON IT Park, Kharadi, Pune',
    }),
    defineField({
      name: 'locality',
      title: 'Locality / Area',
      type: 'reference',
      to: [{type: 'location'}],
      description: 'Select linked locality (e.g. Kharadi, Baner, Wakad)',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      initialValue: 'Pune',
    }),
    defineField({
      name: 'possession',
      title: 'Possession Status',
      type: 'string',
      options: {
        list: [
          {title: 'Ready to Move', value: 'Ready to Move'},
          {title: 'Under Construction', value: 'Under Construction'},
          {title: 'New Launch', value: 'New Launch'},
        ],
      },
      initialValue: 'Ready to Move',
    }),
    defineField({
      name: 'furnishing',
      title: 'Furnishing Status',
      type: 'string',
      options: {
        list: [
          {title: 'Unfurnished', value: 'Unfurnished'},
          {title: 'Semi-Furnished', value: 'Semi-Furnished'},
          {title: 'Fully Furnished', value: 'Fully Furnished'},
        ],
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Property (Show on Homepage)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'verified',
      title: 'Verified by PPI Badge',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'badge',
      title: 'Custom Badge',
      type: 'string',
      description: 'e.g. "Exclusive", "Best Seller", "Price Drop"',
    }),
    defineField({
      name: 'reraId',
      title: 'MahaRERA Registration Number',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main / Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
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
      title: 'Property Photo Gallery',
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
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {
        layout: 'tags',
      },
      description: 'e.g. Swimming Pool, Gymnasium, Clubhouse, 24x7 Security, Children Play Area, Power Backup, Covered Parking',
    }),
    defineField({
      name: 'description',
      title: 'Detailed Description',
      type: 'text',
      rows: 5,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'priceLabel',
      media: 'mainImage',
      location: 'location',
    },
    prepare({title, subtitle, media, location}) {
      return {
        title: title || 'Untitled Property',
        subtitle: [subtitle, location].filter(Boolean).join(' • '),
        media,
      }
    },
  },
})

