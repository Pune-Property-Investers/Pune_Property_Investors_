import { type SchemaTypeDefinition } from 'sanity'

import { propertyType } from './propertyType'
import { projectType } from './projectType'
import { locationType } from './locationType'
import { testimonialType } from './testimonialType'
import { postType } from './postType'
import { categoryType } from './categoryType'
import { authorType } from './authorType'
import { blockContentType } from './blockContentType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    propertyType,
    projectType,
    locationType,
    testimonialType,
    postType,
    categoryType,
    authorType,
    blockContentType,
  ],
}
