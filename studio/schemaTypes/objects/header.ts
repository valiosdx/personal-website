import {defineField, defineType} from 'sanity'

export const header = defineType({
  name: 'header',
  title: 'Header',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name / Logo Text',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo Image',
      type: 'image',
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'button',
    }),
  ],
})