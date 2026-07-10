import {defineField, defineType} from 'sanity'

export const featuredProject = defineType({
  name: 'featuredProject',
  title: 'Featured Project',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Section Label',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [{type: 'projectItem'}],
    }),
  ],
})