import {defineField, defineType} from 'sanity'

export const projectItem = defineType({
  name: 'projectItem',
  title: 'Project Item',
  type: 'object',
  fields: [
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'External URL',
      type: 'url',
    }),
  ],
})