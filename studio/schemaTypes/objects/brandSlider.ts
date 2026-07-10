import {defineField, defineType} from 'sanity'

export const brandSlider = defineType({
  name: 'brandSlider',
  title: 'Brand Slider',
  type: 'object',
  fields: [
    defineField({
      name: 'brands',
      title: 'Brands',
      type: 'array',
      of: [{type: 'brand'}],
    }),
  ],
})