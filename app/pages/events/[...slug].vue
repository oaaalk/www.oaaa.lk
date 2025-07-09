<script setup lang="ts">
import type { Ref } from 'vue'
import type { ContentNavigationItem } from '@nuxt/content'
import { findPageBreadcrumb, mapContentNavigation } from '#ui-pro/utils/content'

// Define the Event type
interface Event {
  title: string
  description?: string
  date?: string
  endDate?: string
  status?: string
  category?: string
  location?: string
  image?: string
  time?: string
  registrationOpen?: boolean
  registrationOpens?: string
  spotsAvailable?: number
  participants?: number
  feedback?: string
  path?: string
  duration?: string
  level?: string
  equipment?: string
  instructor?: string
  registrationDeadline?: string
  contact?: string
  teamSize?: string
  prizes?: string
  author?: any
  whatToBring?: string[]
  categories?: string[]
  nextSession?: string
  price?: string
  body?: any
  prerequisites?: string
  seo?: {
    title?: string
    description?: string
  }
}

const route = useRoute()
const { data: event } = await useAsyncData<Event | null>('event', () =>
  queryCollection('events').path(route.path).first()
)
if (!event.value) throw createError({ statusCode: 404, statusMessage: 'Event not found', fatal: true })

const { data: surround } = await useAsyncData<any>(`${route.path}-surround`, () =>
  queryCollectionItemSurroundings('events', route.path, { fields: ['title'] })
)

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation', ref([]))
const eventsNavigation = computed(() => navigation.value.find(item => item.path === '/events')?.children || [])

const breadcrumb = computed(() => mapContentNavigation(findPageBreadcrumb(eventsNavigation?.value, event.value)).map(({ icon, ...link }) => link))

if (event.value.image) {
  defineOgImage({ url: event.value.image })
} else {
  defineOgImageComponent('Event', {
    headline: breadcrumb.value.map(item => item.label).join(' > ')
  }, {
    fonts: ['Geist:400', 'Geist:600']
  })
}

const title = event.value?.seo?.title || event.value?.title
const description = event.value?.seo?.description || event.value?.description

useSeoMeta({
  title,
  description,
  ogDescription: description,
  ogTitle: title
})

const eventLink = computed(() => typeof window !== 'undefined' ? window.location.href : '')

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

async function copyToClipboard(text: string, message: string) {
  if (import.meta.client && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text)
      // You can add a toast notification here if needed
      console.log(message)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }
}
</script>

<template>
  <UMain class="mt-20 px-2">
    <UContainer class="relative min-h-screen">
      <UPage v-if="event">
        <ULink
          to="/events"
          class="text-sm flex items-center gap-1"
        >
          <UIcon name="lucide:chevron-left" />
          Events
        </ULink>
        <div class="flex flex-col gap-3 mt-8">
          <div class="flex text-xs text-muted items-center justify-center gap-2">
            <span v-if="event.date">
              {{ formatDate(event.date) }}
            </span>
            <span v-if="event.date && event.time">
              -
            </span>
            <span v-if="event.time">
              {{ event.time }}
            </span>
            <span v-if="(event.date || event.time) && event.location">
              -
            </span>
            <span v-if="event.location">
              {{ event.location }}
            </span>
            <span v-if="event.status">
              <UBadge
                :label="event.status"
                color="primary"
              />
            </span>
          </div>
          <NuxtImg
            :src="event.image"
            :alt="event.title"
            class="rounded-lg w-full h-[300px] object-cover object-center"
          />
          <h1 class="text-4xl text-center font-medium max-w-3xl mx-auto mt-4">
            {{ event.title }}
          </h1>
          <p class="text-muted text-center max-w-2xl mx-auto">
            {{ event.description }}
          </p>
          <div class="flex items-center justify-center gap-2 mt-2">
            <UUser
              v-if="event.author"
              orientation="vertical"
              color="neutral"
              variant="outline"
              class="justify-center items-center text-center"
              v-bind="event.author"
            />
          </div>
        </div>
        <UPageBody class="max-w-3xl mx-auto">
          <ContentRenderer
            v-if="event.body"
            :value="event"
          />
          <div class="flex items-center justify-end gap-2 text-sm text-muted mt-8">
            <UButton
              size="sm"
              variant="link"
              color="neutral"
              label="Copy link"
              @click="copyToClipboard(eventLink, 'Event link copied to clipboard')"
            />
          </div>
          <UContentSurround :surround="surround" />
        </UPageBody>
      </UPage>
    </UContainer>
  </UMain>
</template>
