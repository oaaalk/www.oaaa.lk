<script setup lang="ts">
import { computed } from 'vue'

const { data: projects } = await useAsyncData('projects', () =>
  queryCollection('projects').all()
)

const projectsArray = computed<Project[]>(() => {
  return (projects.value ?? []).map((project: any) => ({
    ...project,
    path: project._path || project.path || project.url || ''
  })) as Project[]
})

const { data: page } = await useAsyncData('projects-page', () => {
  return queryCollection('pages').path('/projects').first()
})

// Debug logging
console.log('Projects:', projects.value)
console.log('Page data:', page.value)

// Project type
type Project = {
  title: string
  status?: string
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
  icon?: string // Optional icon for card
}

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title || 'Projects',
  ogTitle: page.value?.seo?.title || page.value?.title || 'Projects',
  description: page.value?.seo?.description || page.value?.description || 'Explore our astronomy projects, initiatives, and collaborations',
  ogDescription: page.value?.seo?.description || page.value?.description || 'Explore our astronomy projects, initiatives, and collaborations'
})

// Fallback page data if page is not found
const pageData = computed(() => {
  if (page.value) return { ...page.value, links: page.value.links ?? [] }
  return {
    title: 'Projects',
    description: 'Explore our astronomy projects, initiatives, and collaborations',
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
      <div
        v-if="projectsArray.length"
        class="flex flex-col gap-8"
      >
        <UPageCard
          v-for="project in projectsArray"
          :key="project.title"
          :title="project.title"
          :description="project.description"
          :icon="project.icon"
          :to="project.path"
          orientation="horizontal"
          spotlight
          spotlight-color="primary"
        >
          <img
            :src="project.image"
            :alt="project.title"
            class="w-full"
          >
        </UPageCard>
      </div>
      <div
        v-else
        class="text-center py-16"
      >
        <UIcon
          name="i-lucide-folder-x"
          class="text-6xl text-gray-400 mx-auto mb-4"
        />
        <h3 class="text-2xl font-bold text-gray-700 mb-2">
          No Projects Found
        </h3>
        <p class="text-gray-500 mb-6">
          Check back soon for exciting new projects!
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
