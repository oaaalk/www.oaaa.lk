<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <div class="space-y-6">
    <UPageSection
      :title="page.about.title"
      :description="page.about.description"
      :ui="{
        container: '!p-0',
        title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
        description: 'text-left mt-3 text-sm sm:text-md lg:text-sm text-muted'
      }"
    />

    <div class="flex flex-wrap gap-3 mt-6">
      <UButton
        v-for="link in page.about.links"
        :key="link.label"
        :to="link.to"
        :color="link.color"
        :icon="link.icon"
        size="sm"
      >
        {{ link.label }}
      </UButton>

      <UButton
        to="/projects"
        color="neutral"
        variant="outline"
        icon="i-lucide-folder"
        size="sm"
      >
        View Projects
      </UButton>
    </div>
  </div>
</template>

<style scoped>

</style>
