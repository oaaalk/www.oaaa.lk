<script setup lang="ts">
interface Official {
  name: string
  role: string
  image?: string
}

interface BoardData {
  title: string
  description?: string
  officials: Official[]
}

defineProps<{
  board?: BoardData
}>()
</script>

<template>
  <div
    v-if="board"
    class="space-y-6"
  >
    <UPageSection
      :title="board.title"
      :description="board.description"
      :ui="{
        container: '!p-0',
        title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
        description: 'text-left mt-3 text-sm sm:text-md lg:text-sm text-muted'
      }"
    />

    <!-- Officials Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
      <div
        v-for="official in board.officials"
        :key="official.name"
        class="flex items-start gap-6"
      >
        <UUser
          :name="official.name"
          :description="official.role"
          size="xl"
          class="justify-start"
          :ui="{
            description: 'text-primary-600 dark:text-primary-400 text-sm'
          }"
          :avatar="{
            src: official.image,
            alt: official.name
          }"
        />
      </div>
    </div>
  </div>
</template>
