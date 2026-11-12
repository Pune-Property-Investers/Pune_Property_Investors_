import type { StructureResolver } from 'sanity/structure'
import { HomeIcon } from '@sanity/icons/Home'
import { CaseIcon } from '@sanity/icons/Case'
import { PinIcon } from '@sanity/icons/Pin'
import { CommentIcon } from '@sanity/icons/Comment'
import { DocumentTextIcon } from '@sanity/icons/DocumentText'
import { TagIcon } from '@sanity/icons/Tag'
import { UserIcon } from '@sanity/icons/User'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Pune Property Investors Studio')
    .items([
      // Real Estate Section
      S.listItem()
        .title('Properties')
        .icon(HomeIcon)
        .child(
          S.documentTypeList('property')
            .title('All Properties')
        ),
      S.listItem()
        .title('Projects')
        .icon(CaseIcon)
        .child(
          S.documentTypeList('project')
            .title('Real Estate Projects')
        ),
      S.listItem()
        .title('Localities / Locations')
        .icon(PinIcon)
        .child(
          S.documentTypeList('location')
            .title('Pune Localities')
        ),

      S.divider(),

      // Blog & Insights Section
      S.listItem()
        .title('Blog Posts')
        .icon(DocumentTextIcon)
        .child(
          S.documentTypeList('post')
            .title('Articles & Market Updates')
        ),
      S.listItem()
        .title('Categories')
        .icon(TagIcon)
        .child(
          S.documentTypeList('category')
            .title('Post Categories')
        ),
      S.listItem()
        .title('Authors')
        .icon(UserIcon)
        .child(
          S.documentTypeList('author')
            .title('Authors & Advisors')
        ),

      S.divider(),

      // Social Proof Section
      S.listItem()
        .title('Customer Reviews')
        .icon(CommentIcon)
        .child(
          S.documentTypeList('testimonial')
            .title('Client Testimonials')
        ),
    ])
