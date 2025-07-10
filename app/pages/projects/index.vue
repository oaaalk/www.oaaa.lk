<script setup lang="ts">
import { computed } from 'vue'

const { data: projectsRaw } = await useAsyncData('projects', () =>
  queryCollection('projects').all()
)

const projects = computed(() => {
  return (projectsRaw.value ?? []).map((project: any) => ({
    ...project,
    url: project._path || project.path || project.url || '',
    image: project.image || '',
    date: project.date || ''
  }))
})

const { data: pageRaw } = await useAsyncData('projects-page', () => {
  return queryCollection('pages').path('/projects').first()
})

const page = computed(() => {
  if (pageRaw.value) return { ...pageRaw.value, links: pageRaw.value.links ?? [] }
  return {
    title: 'Projects',
    description: 'Explore our astronomy projects, initiatives, and collaborations',
    links: [],
    seo: {
      title: 'Projects',
      description: 'Explore our astronomy projects, initiatives, and collaborations'
    }
  }
})

// Dummy global object for demonstration; replace with your actual global config if needed
const global = {
  meetingLink: page.value.links[0]?.to || '/',
  email: 'info@oaaa.lk'
}

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title || 'Projects',
  ogTitle: page.value?.seo?.title || page.value?.title || 'Projects',
  description: page.value?.seo?.description || page.value?.description || 'Explore our astronomy projects, initiatives, and collaborations',
  ogDescription: page.value?.seo?.description || page.value?.description || 'Explore our astronomy projects, initiatives, and collaborations'
})
</script>

<template>
  <UPage>
    <UPageHero
      :title="page.title"
      :description="page.description"
      :links="page.links"
      :ui="{
        title: '!mx-0 text-left',
        description: '!mx-0 text-left',
        links: 'justify-start'
      }"
    >
      <template #links>
        <div
          v-if="page.links && page.links.length > 0"
          class="flex items-center gap-2"
        >
          <UButton
            v-if="page.links[0]"
            :to="global.meetingLink"
            v-bind="page.links[0]"
          />
          <UButton
            v-if="page.links[1]"
            :to="`mailto:${global.email}`"
            v-bind="page.links[1]"
          />
        </div>
      </template>
    </UPageHero>
    <UPageSection
      :ui="{
        container: '!pt-0'
      }"
    >
      <Motion
        v-for="(project, index) in projects"
        :key="project.title"
        :initial="{ opacity: 0, transform: 'translateY(10px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: 0.2 * index }"
        :in-view-options="{ once: true }"
      >
        <UPageCard
          :title="project.title"
          :description="project.description"
          :to="project.url"
          orientation="horizontal"
          variant="naked"
          :reverse="index % 2 === 1"
          class="group"
          :ui="{
            wrapper: 'max-sm:order-last'
          }"
        >
          <template #leading>
            <span class="text-sm text-muted">
              {{ project.date ? new Date(project.date).getFullYear() : '' }}
            </span>
          </template>
          <template #footer>
            <ULink
              :to="project.url"
              class="text-sm text-primary flex items-center"
            >
              View Project
              <UIcon
                name="i-lucide-arrow-right"
                class="size-4 text-primary transition-all opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
              />
            </ULink>
          </template>
          <NuxtImg
            :src="project.image"
            :alt="project.title"
            class="object-cover w-full h-48 rounded-lg"
          />
        </UPageCard>
      </Motion>
    </UPageSection>
  </UPage>
</template>
