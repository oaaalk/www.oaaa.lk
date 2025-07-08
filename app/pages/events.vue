<script setup lang="ts">
type Event = {
  category: string
  title: string
  date: string
  end_date?: string
  time?: string
  location: string
  description: string
  image?: string
  url?: string
  status?: 'Ongoing' | 'Upcoming' | 'Completed'
  registration_open?: boolean
  spots_available?: number
  next_location?: string
  communities_remaining?: number
  age_range?: string
  instructor?: string
  equipment_provided?: boolean
  prerequisites?: string
  registration_opens?: string
  categories?: string[]
  prizes?: string
  transportation?: string
  what_to_bring?: string[]
  weather_dependent?: boolean
  global_event?: boolean
  free_admission?: boolean
  family_friendly?: boolean
  international_speakers?: number
  call_for_papers?: string
  participants?: number
  winner?: string
  highlights?: string
  attendance?: number
  media_coverage?: string
  safety_record?: string
  telescopes_built?: number
  completion_rate?: string
  follow_up?: string
  activities?: number
  parent_feedback?: string
  data_points_collected?: number
  asteroids_observed?: number
  international_collaboration?: string
}

const { data: page } = await useAsyncData('events', () => {
  return queryCollection('events').first()
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

useSeoMeta({
  title: page.value?.title,
  ogTitle: page.value?.title,
  description: page.value?.description,
  ogDescription: page.value?.description
})

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function formatDateRange(startDate: string, endDate?: string): string {
  if (!endDate) {
    return formatDate(startDate)
  }

  const start = new Date(startDate)
  const end = new Date(endDate)

  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${start.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${end.getDate()}, ${end.getFullYear()}`
  }

  return `${formatDate(startDate)} - ${formatDate(endDate)}`
}

function getStatusColor(status?: string): string {
  switch (status) {
    case 'Ongoing':
      return 'success'
    case 'Upcoming':
      return 'primary'
    case 'Completed':
      return 'neutral'
    default:
      return 'neutral'
  }
}

function getEventImage(event: Event): { src: string; alt: string } {
  // Return the event's image if available, otherwise return a default placeholder
  return {
    src: event.image || 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=250&fit=crop&crop=center',
    alt: event.title
  }
}
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :ui="{
        title: '!mx-0 text-left',
        description: '!mx-0 text-left',
        links: 'justify-start'
      }"
    >
      <template #links>
        <UButton
          v-for="link in page.links"
          :key="link.label"
          v-bind="link"
        />
      </template>
    </UPageHero>

    <!-- Ongoing Events Section -->
    <UPageSection
      v-if="page.ongoing_events?.events?.length"
      :ui="{ container: '!pt-0' }"
    >
      <div class="mb-8">
        <h2 class="text-3xl font-bold tracking-tight text-highlighted mb-2">
          {{ page.ongoing_events.title }}
        </h2>
        <p class="text-lg text-muted">
          {{ page.ongoing_events.description }}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
        <UPageCard
          v-for="event in page.ongoing_events.events"
          :key="event.title"
          :title="event.title"
          :description="event.description"
          :image="getEventImage(event)"
          :badge="{
            label: event.status || 'Event',
            color: getStatusColor(event.status)
          }"
          :to="event.url"
        >
          <template #header>
            <div class="flex items-center justify-between mb-2">
              <UBadge
                :label="event.category"
                color="primary"
                variant="subtle"
              />
              <UBadge
                v-if="event.registration_open"
                label="Registration Open"
                color="success"
                variant="subtle"
              />
            </div>
          </template>

          <template #default>
            <div class="space-y-3">
              <div class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div class="flex items-center gap-2">
                  <UIcon name="i-heroicons-calendar" class="size-4" />
                  <span>{{ formatDateRange(event.date, event.end_date) }}</span>
                </div>

                <div v-if="event.time" class="flex items-center gap-2">
                  <UIcon name="i-heroicons-clock" class="size-4" />
                  <span>{{ event.time }}</span>
                </div>

                <div class="flex items-center gap-2">
                  <UIcon name="i-heroicons-map-pin" class="size-4" />
                  <span>{{ event.location }}</span>
                </div>

                <div v-if="event.spots_available" class="flex items-center gap-2">
                  <UIcon name="i-heroicons-users" class="size-4" />
                  <span>{{ event.spots_available }} spots available</span>
                </div>
              </div>
            </div>
          </template>

          <template #footer>
            <UButton
              v-if="event.url"
              :to="event.url"
              label="Learn More"
              variant="outline"
              size="sm"
              block
            />
          </template>
        </UPageCard>
      </div>
    </UPageSection>

    <!-- Upcoming Events Section -->
    <UPageSection
      v-if="page.upcoming_events?.events?.length"
      class="bg-gray-50 dark:bg-gray-900/50"
    >
      <div class="mb-8">
        <h2 class="text-3xl font-bold tracking-tight text-highlighted mb-2">
          {{ page.upcoming_events.title }}
        </h2>
        <p class="text-lg text-muted">
          {{ page.upcoming_events.description }}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UPageCard
          v-for="event in page.upcoming_events.events"
          :key="event.title"
          :title="event.title"
          :description="event.description"
          :image="getEventImage(event)"
          :to="event.url"
        >
          <template #header>
            <div class="flex flex-wrap items-center gap-2 mb-2">
              <UBadge
                :label="event.category"
                color="primary"
                variant="subtle"
              />
              <UBadge
                v-if="event.free_admission"
                label="Free"
                color="success"
                variant="subtle"
              />
              <UBadge
                v-if="event.family_friendly"
                label="Family Friendly"
                color="info"
                variant="subtle"
              />
            </div>
          </template>

          <template #default>
            <div class="space-y-3">
              <div class="grid grid-cols-1 gap-2 text-sm text-gray-600 dark:text-gray-400">
                <div class="flex items-center gap-2">
                  <UIcon name="i-heroicons-calendar" class="size-4" />
                  <span>{{ formatDateRange(event.date, event.end_date) }}</span>
                </div>

                <div v-if="event.time" class="flex items-center gap-2">
                  <UIcon name="i-heroicons-clock" class="size-4" />
                  <span>{{ event.time }}</span>
                </div>

                <div class="flex items-center gap-2">
                  <UIcon name="i-heroicons-map-pin" class="size-4" />
                  <span>{{ event.location }}</span>
                </div>

                <div v-if="event.instructor" class="flex items-center gap-2">
                  <UIcon name="i-heroicons-academic-cap" class="size-4" />
                  <span>{{ event.instructor }}</span>
                </div>
              </div>
            </div>
          </template>

          <template #footer>
            <div class="flex gap-2">
              <UButton
                v-if="event.url"
                :to="event.url"
                label="Register Now"
                size="sm"
                block
              />

              <UButton
                v-else-if="event.registration_opens"
                :label="`Opens ${event.registration_opens}`"
                variant="outline"
                size="sm"
                disabled
                block
              />
            </div>
          </template>
        </UPageCard>
      </div>
    </UPageSection>

    <!-- Event Statistics -->
    <UPageSection
      v-if="page.event_statistics"
      class="bg-primary-50 dark:bg-primary-950/20"
    >
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold tracking-tight text-highlighted mb-2">
          {{ page.event_statistics.title }}
        </h2>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div
          v-for="stat in page.event_statistics.stats"
          :key="stat.label"
          class="text-center"
        >
          <div class="flex justify-center mb-2">
            <UIcon :name="stat.icon" class="size-8 text-primary-600" />
          </div>
          <div class="text-2xl font-bold text-highlighted">{{ stat.value }}</div>
          <div class="text-sm text-muted">{{ stat.label }}</div>
        </div>
      </div>
    </UPageSection>

    <!-- Completed Events Section -->
    <UPageSection v-if="page.completed_events?.events?.length">
      <div class="mb-8">
        <h2 class="text-3xl font-bold tracking-tight text-highlighted mb-2">
          {{ page.completed_events.title }}
        </h2>
        <p class="text-lg text-muted">
          {{ page.completed_events.description }}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UPageCard
          v-for="event in page.completed_events.events"
          :key="event.title"
          :title="event.title"
          :description="event.description"
          :image="getEventImage(event)"
          :to="event.url"
        >
          <template #header>
            <div class="flex items-center justify-between mb-2">
              <UBadge
                :label="event.category"
                color="neutral"
                variant="subtle"
              />
              <span class="text-xs text-gray-500">{{ formatDate(event.date) }}</span>
            </div>
          </template>

          <template #default>
            <div class="space-y-2">
              <div v-if="event.participants || event.attendance || event.winner" class="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <div v-if="event.participants" class="flex items-center gap-2">
                  <UIcon name="i-heroicons-users" class="size-4" />
                  <span>{{ event.participants }} participants</span>
                </div>

                <div v-if="event.attendance" class="flex items-center gap-2">
                  <UIcon name="i-heroicons-user-group" class="size-4" />
                  <span>{{ event.attendance }} attendees</span>
                </div>

                <div v-if="event.winner" class="flex items-center gap-2">
                  <UIcon name="i-heroicons-trophy" class="size-4" />
                  <span>Winner: {{ event.winner }}</span>
                </div>
              </div>
            </div>
          </template>

          <template #footer>
            <UButton
              v-if="event.url"
              :to="event.url"
              label="View Details"
              variant="ghost"
              size="sm"
              block
            />
          </template>
        </UPageCard>
      </div>
    </UPageSection>

    <!-- Newsletter Signup -->
    <UPageSection
      v-if="page.newsletter_signup"
      class="bg-gray-50 dark:bg-gray-900/50"
    >
      <div class="max-w-md mx-auto text-center">
        <h2 class="text-2xl font-bold tracking-tight text-highlighted mb-2">
          {{ page.newsletter_signup.title }}
        </h2>
        <p class="text-muted mb-6">
          {{ page.newsletter_signup.description }}
        </p>

        <div class="flex flex-col space-y-3">
          <UInput
            :placeholder="page.newsletter_signup.placeholder"
            type="email"
            size="lg"
          />
          <UButton
            :label="page.newsletter_signup.button_text"
            size="lg"
            class="w-full"
          />
          <p class="text-xs text-muted">
            {{ page.newsletter_signup.frequency }}
          </p>
        </div>
      </div>
    </UPageSection>
  </UPage>
</template>
