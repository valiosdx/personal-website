import {defineField, defineType} from 'sanity'

export const button = defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          {title: 'external URL', value: 'external'},
          {title: 'Internal Page', value: 'internal'},
          {title: 'Email', value: 'email'},
          {title: 'Phone', value: 'phone'},
        ],
        layout: 'radio',
      },
      initialValue: 'external',
    }),
    defineField({
      name: 'url',
      title: 'URL / Email / Phone',
      type: 'string',
      description:
        'External: https://example.com | Internal: /about | Email: name@email.com | Phone: +628123456789',
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: true,
      hidden: ({parent}) => parent?.type === 'email' || parent?.type === 'phone',
    }),
  ],
})
