<script setup lang="ts">
import { findPageBreadcrumb, mapContentNavigation } from '#ui-pro/utils/content'

const route = useRoute()
const { data: project } = await useAsyncData<any>(route.path, () =>
  queryCollection('projects').path(route.path).first()
)
if (!project.value) throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
const { data: surround } = await useAsyncData<any>(`${route.path}-surround`, () =>
  queryCollectionItemSurroundings('projects' as any, route.path, { fields: ['title'] })
)
const navigation = inject<any>('navigation', ref([]))
const projectsNavigation = computed(() => navigation.value.find((item: any) => item.path === '/projects')?.children || [])
const breadcrumb = computed(() => mapContentNavigation(findPageBreadcrumb(projectsNavigation?.value, project.value)).map(({ icon, ...link }: any) => link))
if (project.value.image) {
  defineOgImage({ url: project.value.image })
} else {
  defineOgImageComponent('Project', {
    headline: breadcrumb.value.map((item: any) => item.label).join(' > ')
  }, {
    fonts: ['Geist:400', 'Geist:600']
  })
}
const title = project.value?.seo?.title || project.value?.title
const description = project.value?.seo?.description || project.value?.description
useSeoMeta({
  title,
  description,
  ogDescription: description,
  ogTitle: title
})
const projectLink = computed(() => typeof window !== 'undefined' ? window.location.href : '')
function formatDate(dateString: any) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<template>
  <UMain class="mt-20 px-2">
    <UContainer class="relative min-h-screen">
      <UPage v-if="project">
        <ULink
          to="/projects"
          class="text-sm flex items-center gap-1"
        >
          <UIcon name="lucide:chevron-left" />
          Projects
        </ULink>
        <div class="flex flex-col gap-3 mt-8">
          <div class="flex text-xs text-muted items-center justify-center gap-2">
            <span v-if="project.date">
              {{ formatDate(project.date) }}
            </span>
          </div>
          <NuxtImg
            :src="project.image"
            :alt="project.title"
            class="rounded-lg w-full h-[300px] object-cover object-center"
          />
          <h1 class="text-4xl text-center font-medium max-w-3xl mx-auto mt-4">
            {{ project.title }}
          </h1>
          <p class="text-muted text-center max-w-2xl mx-auto">
            {{ project.description }}
          </p>
          <div class="flex items-center justify-center gap-2 mt-2">
            <UUser
              v-if="project.author"
              orientation="vertical"
              color="neutral"
              variant="outline"
              class="justify-center items-center text-center"
              v-bind="project.author"
            />
          </div>
        </div>
        <UPageBody class="max-w-3xl mx-auto">
          <ContentRenderer
            v-if="project.body"
            :value="project"
          />
          <div class="flex items-center justify-end gap-2 text-sm text-muted mt-8">
            <UButton
              size="sm"
              variant="link"
              color="neutral"
              label="Copy link"
              @click="copyToClipboard(projectLink, 'Project link copied to clipboard')"
            />
          </div>
          <UContentSurround :surround="surround" />
        </UPageBody>
      </UPage>
    </UContainer>
  </UMain>
</template>
