import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const createBaseSchema = () => z.object({
  title: z.string(),
  description: z.string()
})

const createButtonSchema = () => z.object({
  label: z.string(),
  icon: z.string().optional(),
  to: z.string().optional(),
  color: z.enum(['primary', 'neutral', 'success', 'warning', 'error', 'info']).optional(),
  size: z.enum(['xs', 'sm', 'md', 'lg', 'xl']).optional(),
  variant: z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link']).optional(),
  target: z.enum(['_blank', '_self']).optional()
})

const createImageSchema = () => z.object({
  src: z.string().editor({ input: 'media' }),
  alt: z.string()
})

const createAuthorSchema = () => z.object({
  name: z.string(),
  description: z.string().optional(),
  username: z.string().optional(),
  twitter: z.string().optional(),
  to: z.string().optional(),
  avatar: createImageSchema().optional()
})

const createTestimonialSchema = () => z.object({
  quote: z.string(),
  author: createAuthorSchema()
})

export default defineContentConfig({
  collections: {
    index: defineCollection({
      type: 'page',
      source: 'index.yml',
      schema: z.object({
        hero: z.object({
          links: z.array(createButtonSchema()),
          images: z.array(createImageSchema())
        }),
        about: createBaseSchema().extend({
          links: z.array(createButtonSchema())
        }),
        mission: z.object({
          title: z.string(),
          description: z.string(),
          icon: z.string()
        }),
        vision: z.object({
          title: z.string(),
          description: z.string(),
          icon: z.string()
        }),
        experience: createBaseSchema().extend({
          items: z.array(z.object({
            date: z.union([z.date(), z.string()]),
            position: z.string(),
            company: z.object({
              name: z.string(),
              url: z.string(),
              logo: z.string().editor({ input: 'icon' }),
              color: z.string()
            })
          }))
        }),
        board: z.object({
          title: z.string(),
          description: z.string(),
          officials: z.array(z.object({
            name: z.string(),
            role: z.string(),
            position: z.string(),
            image: z.string()
          }))
        }),
        testimonials: z.array(createTestimonialSchema()),
        faq: z.object({
          title: z.string(),
          description: z.string(),
          categories: z.array(z.object({
            title: z.string(),
            questions: z.array(z.object({
              label: z.string(),
              content: z.string()
            }))
          }))
        })
      })
    }),
    projects: defineCollection({
      type: 'page',
      source: 'projects/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        image: z.string(),
        category: z.string(),
        status: z.string(),
        tags: z.array(z.string()).optional(),
        participants: z.string().optional(),
        age_range: z.string().optional(),
        locations: z.string().optional(),
        success_rate: z.string().optional(),
        year: z.union([z.number(), z.string()]).optional(),
        scope: z.string().optional(),
        legacy: z.string().optional(),
        format: z.string().optional(),
        duration: z.string().optional(),
        location: z.string().optional(),
        frequency: z.string().optional(),
        motto: z.string().optional(),
        external_link: z.string().optional(),
        reach: z.string().optional(),
        impact: z.string().optional(),
        languages: z.string().optional(),
        users: z.string().optional(),
        courses: z.string().optional(),
        organizers: z.array(z.string()).optional(),
        author: createAuthorSchema().optional()
      })
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        minRead: z.number(),
        date: z.date(),
        image: z.string().nonempty().editor({ input: 'media' }),
        author: createAuthorSchema()
      })
    }),
    pages: defineCollection({
      type: 'page',
      source: [
        { include: 'projects.yml' },
        { include: 'blog.yml' },
        { include: 'events.yml' },
        { include: 'pages/*.md' }
      ],
      schema: z.object({
        links: z.array(createButtonSchema()).optional(),
        seo: z.object({
          title: z.string().optional(),
          description: z.string().optional()
        }).optional()
      })
    }),
    events: defineCollection({
      type: 'page',
      source: 'events/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.string(),
        endDate: z.string().optional(),
        status: z.string(),
        category: z.string(),
        location: z.string(),
        image: z.string().optional(),
        time: z.string().optional(),
        duration: z.string().optional(),
        level: z.string().optional(),
        equipment: z.string().optional(),
        instructor: z.string().optional(),
        registrationOpen: z.boolean().optional(),
        registrationOpens: z.string().optional(),
        registrationDeadline: z.string().optional(),
        spotsAvailable: z.number().optional(),
        participants: z.number().optional(),
        feedback: z.string().optional(),
        contact: z.string().optional(),
        teamSize: z.string().optional(),
        prizes: z.string().optional(),
        author: z.any().optional()
      })
    }),
    about: defineCollection({
      type: 'page',
      source: 'about.yml',
      schema: z.object({
        content: z.object({}),
        images: z.array(createImageSchema())
      })
    })
  }
})
