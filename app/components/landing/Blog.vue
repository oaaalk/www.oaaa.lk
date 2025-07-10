<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()

const { data: posts } = await useAsyncData('index-events', () =>
  queryCollection('events').order('date', 'DESC').limit(3).all()
)
if (!posts.value) {
  throw createError({ statusCode: 404, statusMessage: 'events not found', fatal: true })
}
</script>

<template>
  <UPageSection
    :title="page.blog.title"
    :description="page.blog.description"
    :ui="{
      container: 'px-0 !pt-0 sm:gap-6 lg:gap-8',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-left mt-2 text-sm sm:text-md lg:text-sm text-muted'
    }"
  >
    <UBlogPosts
      orientation="vertical"
      class="gap-4 lg:gap-y-4"
    >
      <UBlogPost
        v-for="(post, index) in posts"
        :key="index"
        orientation="horizontal"
        variant="naked"
        v-bind="post"
        :to="post.path"
        :ui="{
          root: 'group relative lg:items-start lg:flex ring-0 hover:ring-0',
          body: '!px-0',
          header: 'hidden'
        }"
      >
        <template #image>
          <div class="flex-shrink-0 mr-6">
            <NuxtImg
              v-if="post.image"
              :src="post.image"
              :alt="post.title"
              class="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl shadow-sm"
            />
            <div
              v-else
              class="w-20 h-20 sm:w-24 sm:h-24 bg-muted rounded-xl flex items-center justify-center shadow-sm"
            >
              <UIcon
                name="i-lucide-calendar-days"
                class="w-8 h-8 text-muted-foreground"
              />
            </div>
          </div>
        </template>

        <template #footer>
          <UButton
            size="xs"
            variant="link"
            class="px-0 gap-0"
            label="View Event"
            :to="post.path"
          >
            <template #trailing>
              <UIcon
                name="i-lucide-arrow-right"
                class="size-4 text-primary transition-all opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
              />
            </template>
          </UButton>
        </template>
      </UBlogPost>
    </UBlogPosts>
  </UPageSection>
</template>
