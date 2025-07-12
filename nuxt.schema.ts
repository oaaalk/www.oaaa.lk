import { field, group } from '@nuxt/content/preview'

export default defineNuxtSchema({
  appConfig: {
    global: group({
      title: 'OAAA',
      description: 'Old Anandians Astronomical Association',
      icon: 'lucide:settings',
      fields: {
        meetingLink: field({
          type: 'string',
          title: 'Meeting link',
          description: 'Your meeting link.',
          icon: 'lucide:calendar',
          default: 'https://oaaa.lk'
        }),
        available: field({
          type: 'boolean',
          title: 'Available',
          description: 'Your availability.',
          icon: 'lucide:check',
          default: true
        }),
        email: field({
          type: 'string',
          title: 'Email',
          description: 'OAAA official email address.',
          icon: 'lucide:mail',
          default: 'astroananda@gmail.com'
        }),
        picture: group({
          title: 'Picture',
          description: 'Your profile picture.',
          icon: 'lucide:user',
          fields: {
            dark: field({
              type: 'string',
              title: 'Dark mode',
              description: 'Your profile picture in dark mode.',
              icon: 'heroicons-solid:moon',
              default: '/oaaa.jpg'
            }),
            light: field({
              type: 'string',
              title: 'Light mode',
              description: 'Your profile picture in light mode.',
              icon: 'heroicons-solid:sun',
              default: '/oaaa.jpg'
            }),
            alt: field({
              type: 'string',
              title: 'Alt text',
              description: 'OAAA Logo.',
              icon: 'lucide:image',
              default: 'OAAA Logo'
            })
          }
        })
      }
    }),
    ui: group({
      title: 'UI',
      description: 'UI Customization.',
      icon: 'i-mdi-palette-outline',
      fields: {
        colors: group({
          title: 'Colors',
          description: 'Manage main colors of your application',
          icon: 'i-mdi-palette-outline',
          fields: {
            primary: field({
              type: 'string',
              title: 'Primary',
              description: 'Primary color of your UI.',
              icon: 'i-mdi-palette-outline',
              default: 'green',
              required: ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']
            }),
            neutral: field({
              type: 'string',
              title: 'Neutral',
              description: 'Neutral color of your UI.',
              icon: 'i-mdi-palette-outline',
              default: 'slate',
              required: ['slate', 'gray', 'zinc', 'neutral', 'stone']
            })
          }
        }),
        icons: group({
          title: 'Icons',
          description: 'Manage icons used in the application.',
          icon: 'i-mdi-application-settings-outline',
          fields: {
            search: field({
              type: 'icon',
              title: 'Search Bar',
              description: 'Icon to display in the search bar.',
              icon: 'i-mdi-magnify',
              default: 'i-lucide-search'
            }),
            dark: field({
              type: 'icon',
              title: 'Dark mode',
              description: 'Icon of color mode button for dark mode.',
              icon: 'i-mdi-moon-waning-crescent',
              default: 'i-lucide-moon'
            }),
            light: field({
              type: 'icon',
              title: 'Light mode',
              description: 'Icon of color mode button for light mode.',
              icon: 'i-mdi-white-balance-sunny',
              default: 'i-lucide-sun'
            }),
            external: field({
              type: 'icon',
              title: 'External Link',
              description: 'Icon for external link.',
              icon: 'i-mdi-arrow-top-right',
              default: 'i-lucide-external-link'
            }),
            chevron: field({
              type: 'icon',
              title: 'Chevron',
              description: 'Icon for chevron.',
              icon: 'i-mdi-chevron-down',
              default: 'i-lucide-chevron-down'
            }),
            hash: field({
              type: 'icon',
              title: 'Hash',
              description: 'Icon for hash anchors.',
              icon: 'i-ph-hash',
              default: 'i-lucide-hash'
            })
          }
        })
      }
    }),
    seo: group({
      title: 'SEO',
      description: 'SEO configuration.',
      icon: 'i-ph-app-window',
      fields: {
        siteName: field({
          type: 'string',
          title: 'Name',
          description: 'Name used in ogSiteName and as the second part of your page title (My page title - OAAA).',
          icon: 'i-mdi-web',
          default: 'OAAA'
        })
      }
    }),
    footer: group({
      title: 'Footer',
      description: 'Footer configuration.',
      icon: 'i-mdi-page-layout-footer',
      fields: {
        credits: field({
          type: 'string',
          title: 'Footer credits section',
          description: 'Text to display as credits in the footer.',
          icon: 'i-mdi-circle-edit-outline',
          default: ''
        }),
        links: field({
          type: 'array',
          title: 'Links',
          description: 'Array of link object displayed in footer.',
          icon: 'i-mdi-link-variant',
          default: []
        })
      }
    })
  }
})
