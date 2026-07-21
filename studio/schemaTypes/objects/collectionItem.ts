import {defineField, defineType} from 'sanity'

export const collectionItem = defineType({
  name: 'collectionItem',
  title: 'Collection Item',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
        accept: 'image/jpeg, image/png, image/webp, image/svg+xml, image/avif, image/jpg',
      },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
    }),
  ],
})
