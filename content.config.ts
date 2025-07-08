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

const createEventSchema = () => z.object({
  category: z.enum(['Educational Program', 'Community Outreach', 'Youth Education', 'Workshop', 'Competition', 'Public Event', 'Educational', 'Conference', 'Research']),
  title: z.string(),
  date: z.date(),
  end_date: z.date().optional(),
  time: z.string().optional(),
  location: z.string(),
  description: z.string(),
  image: z.string().optional(),
  url: z.string().optional(),
  status: z.enum(['Ongoing', 'Upcoming', 'Completed']).optional(),
  registration_open: z.boolean().optional(),
  spots_available: z.number().optional(),
  next_location: z.string().optional(),
  communities_remaining: z.number().optional(),
  age_range: z.string().optional(),
  instructor: z.string().optional(),
  equipment_provided: z.boolean().optional(),
  prerequisites: z.string().optional(),
  registration_opens: z.string().optional(),
  categories: z.array(z.string()).optional(),
  prizes: z.string().optional(),
  transportation: z.string().optional(),
  what_to_bring: z.array(z.string()).optional(),
  weather_dependent: z.boolean().optional(),
  global_event: z.boolean().optional(),
  free_admission: z.boolean().optional(),
  family_friendly: z.boolean().optional(),
  international_speakers: z.number().optional(),
  call_for_papers: z.string().optional(),
  participants: z.number().optional(),
  winner: z.string().optional(),
  highlights: z.string().optional(),
  attendance: z.number().optional(),
  media_coverage: z.string().optional(),
  safety_record: z.string().optional(),
  telescopes_built: z.number().optional(),
  completion_rate: z.string().optional(),
  follow_up: z.string().optional(),
  activities: z.number().optional(),
  parent_feedback: z.string().optional(),
  data_points_collected: z.number().optional(),
  asteroids_observed: z.number().optional(),
  international_collaboration: z.string().optional()
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
        testimonials: z.array(createTestimonialSchema())
      })
    }),
    projects: defineCollection({
      type: 'data',
      source: 'projects/*.yml',
      schema: z.object({
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        image: z.string().nonempty().editor({ input: 'media' }),
        url: z.string().nonempty(),
        tags: z.array(z.string()),
        date: z.date()
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
        { include: 'blog.yml' }
      ],
      schema: z.object({
        links: z.array(createButtonSchema())
      })
    }),
    events: defineCollection({
      type: 'page',
      source: 'speaking.yml',
      schema: z.object({
        links: z.array(createButtonSchema()),
        ongoing_events: z.object({
          title: z.string(),
          description: z.string(),
          events: z.array(createEventSchema())
        }),
        upcoming_events: z.object({
          title: z.string(),
          description: z.string(),
          events: z.array(createEventSchema())
        }),
        completed_events: z.object({
          title: z.string(),
          description: z.string(),
          events: z.array(createEventSchema())
        }),
        event_statistics: z.object({
          title: z.string(),
          stats: z.array(z.object({
            label: z.string(),
            value: z.string(),
            icon: z.string()
          }))
        }),
        newsletter_signup: z.object({
          title: z.string(),
          description: z.string(),
          placeholder: z.string(),
          button_text: z.string(),
          frequency: z.string()
        })
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
