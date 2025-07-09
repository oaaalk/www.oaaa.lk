<script setup lang="ts">
import Board from '~/components/landing/Board.vue'

const { data: page } = await useAsyncData('index', () => {
  return queryCollection('index').first()
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description
})
</script>

<template>
  <UPage v-if="page">
    <LandingHero :page />
    <UPageSection
      :ui="{
        container: '!pt-0 lg:grid lg:grid-cols-2 lg:gap-8'
      }"
    >
      <LandingAbout :page />
      <LandingWorkExperience :page />
    </UPageSection>

    <!-- Mission and Vision Section -->
    <UPageSection
      class=""
      :ui="{
        container: '!pt-16 lg:grid lg:grid-cols-2 lg:gap-12'
      }"
    >
      <!-- Mission -->
      <div class="space-y-6">
        <div class="flex items-center gap-3">
          <div class="flex items-center justify-center size-12 rounded-lg bg-primary-100 dark:bg-primary-900/20">
            <UIcon
              :name="page.mission.icon"
              class="size-6 text-primary-600"
            />
          </div>
          <h2 class="text-2xl font-bold tracking-tight text-highlighted">
            {{ page.mission.title }}
          </h2>
        </div>
        <p class="text-muted leading-relaxed">
          {{ page.mission.description }}
        </p>
      </div>

      <!-- Vision -->
      <div class="space-y-6 mt-12 lg:mt-0">
        <div class="flex items-center gap-3">
          <div class="flex items-center justify-center size-12 rounded-lg bg-success-100 dark:bg-success-900/20">
            <UIcon
              :name="page.vision.icon"
              class="size-6 text-success-600"
            />
          </div>
          <h2 class="text-2xl font-bold tracking-tight text-highlighted">
            {{ page.vision.title }}
          </h2>
        </div>
        <p class="text-muted leading-relaxed">
          {{ page.vision.description }}
        </p>
      </div>
    </UPageSection>

    <!-- Board Section -->
    <UPageSection class="">
      <Board :board="page.board" />
    </UPageSection>

    <!-- Testimonials Section -->
    <LandingTestimonials :page />

    <!-- FAQ Section -->
    <LandingFAQ :page="page" />
  </UPage>
</template>
