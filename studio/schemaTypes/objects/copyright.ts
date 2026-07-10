import {defineField, defineType} from 'sanity'

export const copyright = defineType({
  name: 'copyright',
  title: 'Copyright',
  type: 'object',
  fields: [
    defineField({
      name: 'leftText',
      title: 'Left Text',
      type: 'string',
    }),
    defineField({
      name: 'rightText',
      title: 'Right Text',
      type: 'string',
    }),
  ],
})