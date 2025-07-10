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
    date: project.date || '',
    endDate: project.endDate || ''
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

// Function to format project period
const getProjectPeriod = (project: any) => {
  if (!project.date) return 'Ongoing'

  const startDate = new Date(project.date)
  const endDate = project.endDate ? new Date(project.endDate) : null

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    })
  }

  if (endDate) {
    return `${formatDate(startDate)} - ${formatDate(endDate)}`
  } else {
    return `${formatDate(startDate)} - Present`
  }
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
    />

    <UPageSection :ui="{ container: '!pt-0' }">
      <div class="space-y-8">
        <Motion
          v-for="(project, index) in projects"
          :key="project.title"
          :initial="{ opacity: 0, transform: 'translateY(20px)' }"
          :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ delay: 0.1 * index }"
          :in-view-options="{ once: true }"
        >
          <UCard
            class="overflow-hidden"
            :ui="{
              body: 'p-0'
            }"
          >
            <div class="md:flex">
              <!-- Large Image Section -->
              <div class="md:w-1/3 lg:w-2/5">
                <NuxtImg
                  v-if="project.image"
                  :src="project.image"
                  :alt="project.title"
                  class="w-full h-64 md:h-full object-cover"
                />
                <div
                  v-else
                  class="w-full h-64 md:h-full bg-muted flex items-center justify-center"
                >
                  <UIcon
                    name="i-lucide-telescope"
                    class="w-16 h-16 text-muted-foreground"
                  />
                </div>
              </div>

              <!-- Content Section -->
              <div class="md:w-2/3 lg:w-3/5 p-6 md:p-8 flex flex-col justify-between">
                <!-- Header Content -->
                <div class="space-y-4">
                  <div class="flex items-start justify-between">
                    <div class="space-y-2">
                      <div
                        v-if="project.category"
                        class="flex items-center gap-2"
                      >
                        <span class="text-sm font-medium text-primary uppercase tracking-wide">
                          {{ project.category }}
                        </span>
                      </div>
                      <h2 class="text-xl font-semibold text-foreground leading-tight">
                        {{ project.title }}
                      </h2>
                    </div>
                    <div class="flex flex-col gap-2 ml-4">
                      <UBadge
                        v-if="project.status"
                        :label="project.status"
                        :color="project.status === 'Completed' ? 'success' : project.status === 'Ongoing' ? 'primary' : 'neutral'"
                        variant="soft"
                        size="sm"
                      />
                      <UBadge
                        :label="getProjectPeriod(project)"
                        variant="outline"
                        size="sm"
                      />
                    </div>
                  </div>

                  <p class="text-muted-foreground leading-relaxed">
                    {{ project.description }}
                  </p>
                </div>

                <!-- Footer Content -->
                <div class="flex items-center justify-between mt-6 pt-4 border-t border-border">
                  <div class="space-y-1">
                    <div
                      v-if="project.participants"
                      class="text-sm text-muted-foreground"
                    >
                      <span class="font-medium">Participants:</span> {{ project.participants }}
                    </div>
                    <div
                      v-if="project.location"
                      class="text-sm text-muted-foreground"
                    >
                      <span class="font-medium">Location:</span> {{ project.location }}
                    </div>
                  </div>
                  <UButton
                    :to="project.url"
                    color="neutral"
                    size="sm"
                    class="px-4"
                  >
                    View Project
                    <UIcon
                      name="i-lucide-arrow-right"
                      class="ml-2 w-4 h-4"
                    />
                  </UButton>
                </div>
              </div>
            </div>
          </UCard>
        </Motion>
      </div>
    </UPageSection>
  </UPage>
</template>
