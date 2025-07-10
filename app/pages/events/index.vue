<script setup lang="ts">
import { computed } from 'vue'

const { data: events } = await useAsyncData('events', () =>
  queryCollection('events').all()
)

const eventsArray = computed<Event[]>(() => {
  return (events.value ?? []).map((event: any) => ({
    ...event,
    path: event._path || event.path || ''
  })) as Event[]
})

const getStatusLabel = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

const getEventStatus = (event: any) => {
  if (!event.date) return 'upcoming'
  const eventDate = new Date(event.date)
  const today = new Date()
  const endDate = event.endDate ? new Date(event.endDate) : eventDate
  return today < eventDate ? 'upcoming' : today > endDate ? 'completed' : 'ongoing'
}
const timelineEvents = computed(() =>
  eventsArray.value
    .slice()
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    .map(event => ({
      title: event.title,
      description: event.description,
      image: event.image,
      date: event.date,
      badge: getStatusLabel(getEventStatus(event)),
      to: event.path,
      ui: { container: 'max-w-xl' }
    }))
)

const { data: page } = await useAsyncData('events-page', () => {
  return queryCollection('pages').path('/events').first()
})

// Debug logging
console.log('Events:', events.value)
console.log('Page data:', page.value)

// Filter events by status
type Event = {
  title: string
  status: string
  date?: string
  endDate?: string
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
  description?: string
}

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title || 'Events',
  ogTitle: page.value?.seo?.title || page.value?.title || 'Events',
  description: page.value?.seo?.description || page.value?.description || 'Join us for exciting astronomy events, workshops, and community activities',
  ogDescription: page.value?.seo?.description || page.value?.description || 'Join us for exciting astronomy events, workshops, and community activities'
})

// Fallback page data if page is not found
const pageData = computed(() => {
  if (page.value) return { ...page.value, links: page.value.links ?? [] }
  return {
    title: 'Events',
    description: 'Join us for exciting astronomy events, workshops, and community activities',
    links: []
  }
})
</script>

<template>
  <UPage>
    <UPageHero
      :title="pageData.title"
      :description="pageData.description"
      :links="pageData.links"
      :ui="{
        title: '!mx-0 text-left',
        description: '!mx-0 text-left',
        links: 'justify-start'
      }"
    />
    <UPageSection :ui="{ container: '!pt-0' }">
      <UChangelogVersions
        v-if="timelineEvents.length"
        :versions="timelineEvents"
      />
      <div
        v-else
        class="text-center py-16"
      >
        <UIcon
          name="i-lucide-calendar-x"
          class="text-6xl text-gray-400 mx-auto mb-4"
        />
        <h3 class="text-2xl font-bold text-gray-700 mb-2">
          No Events Found
        </h3>
        <p class="text-gray-500 mb-6">
          Check back soon for exciting upcoming events!
        </p>
        <UButton
          to="/"
          label="Back to Home"
          color="primary"
          size="lg"
        />
      </div>
    </UPageSection>
  </UPage>
</template>
