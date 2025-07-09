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
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <UCard
          v-for="project in projectsArray"
          :key="project.title"
          :to="project.path"
          class="group hover:shadow-lg transition-all duration-300 overflow-hidden"
          :ui="{
            header: { padding: '!p-0' },
            body: { padding: 'p-6' },
            footer: { padding: 'px-6 pb-6' }
          }"
        >
          <template #header>
            <div class="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img
                v-if="project.image"
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              >
              <div
                v-else
                class="w-full h-full flex items-center justify-center"
              >
                <UIcon
                  name="i-heroicons-telescope"
                  class="text-4xl text-gray-400"
                />
              </div>
            </div>
          </template>

          <div class="space-y-3">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
              {{ project.title }}
            </h3>
            <p
              v-if="project.description"
              class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2"
            >
              {{ project.description }}
            </p>
            <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span v-if="project.date">{{ new Date(project.date).toLocaleDateString() }}</span>
              <span v-if="project.category">{{ project.category }}</span>
            </div>
          </div>

          <template #footer>
            <div class="flex items-center justify-between">
              <UBadge
                v-if="project.status"
                :color="project.status === 'completed' ? 'green' : project.status === 'active' ? 'blue' : 'gray'"
                variant="subtle"
                size="sm"
              >
                {{ project.status }}
              </UBadge>
              <UButton
                icon="i-heroicons-arrow-right"
                size="sm"
                color="gray"
                variant="ghost"
                trailing
                :to="project.path"
              >
                View Project
              </UButton>
            </div>
          </template>
        </UCard>
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