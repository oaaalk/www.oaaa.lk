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
    <!-- Section Header -->
    <div>
      <h2 class="text-3xl font-bold tracking-tight text-highlighted">
        {{ board.title }}
      </h2>
      <p
        v-if="board.description"
        class="text-muted text-lg mt-4"
      >
        {{ board.description }}
      </p>
    </div>
    <!-- Officials Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
