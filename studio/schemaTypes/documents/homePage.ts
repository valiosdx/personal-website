import {defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'header',
      title: 'Header',
      type: 'header',
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'hero',
    }),
    defineField({
      name: 'brandSlider',
      title: 'Brand Slider',
      type: 'brandSlider',
    }),
    defineField({
      name: 'featuredProject',
      title: 'Featured Project',
      type: 'featuredProject',
    }),
    defineField({
      name: 'about',
      title: 'About',
      type: 'about',
    }),
    defineField({
      name: 'service',
      title: 'Service',
      type: 'service',
    }),
    defineField({
      name: 'collection',
      title: 'Collection',
      type: 'collection',
    }),
    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'contact',
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright',
      type: 'copyright',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Homepage',
      }
    },
  },
})
