<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

interface FAQItem {
  label: string
  content: string
}

interface FAQCategory {
  title: string
  questions: FAQItem[]
}

interface ExtendedIndexCollectionItem extends IndexCollectionItem {
  faq?: {
    title: string
    description: string
    categories: FAQCategory[]
  }
}

const props = defineProps<{
  page: ExtendedIndexCollectionItem
}>()

const items = computed(() => {
  return props.page.faq?.categories?.map((faq: FAQCategory) => {
    return {
      label: faq.title,
      key: faq.title.toLowerCase(),
      questions: faq.questions.map((question: FAQItem) => ({
        label: question.label,
        content: question.content
      }))
    }
  }) || []
})

const ui = {
  root: 'flex items-center gap-4 w-full',
  list: 'relative flex bg-transparent dark:bg-transparent gap-2 px-0',
  indicator: 'absolute top-[4px] duration-200 ease-out focus:outline-none rounded-lg bg-elevated/60',
  trigger: 'px-3 py-2 rounded-lg hover:bg-muted/50 data-[state=active]:text-highlighted data-[state=inactive]:text-muted',
  label: 'truncate'
}
</script>

<template>
  <UPageSection
    v-if="page.faq && items.length > 0"
    :title="page.faq.title"
    :description="page.faq.description"
    :ui="{
      container: 'px-0 !pt-0 gap-4 sm:gap-4',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-left mt-2 text-sm sm:text-md lg:text-sm text-muted'
    }"
  >
    <UTabs
      :items
      orientation="horizontal"
      :ui
    >
      <template #content="{ item }">
        <UPageAccordion
          trailing-icon="i-lucide-plus"
          :items="item.questions"
          :ui="{
            item: 'border-none',
            trigger: 'mb-2 border-0 group px-4 transform-gpu rounded-lg bg-elevated/60 will-change-transform hover:bg-muted/50',
            trailingIcon: 'group-data-[state=closed]:rotate-0 group-data-[state=open]:rotate-135'
          }"
        >
          <template #item="{ item: _item }">
            <div class="px-4 py-2">
              <MDC
                :value="_item.content || ''"
                class="prose prose-sm max-w-none text-muted leading-relaxed [&>p]:mb-2 [&>ul]:mb-2 [&>ol]:mb-2 [&>li]:mb-1"
              />
            </div>
          </template>
        </UPageAccordion>
      </template>
    </UTabs>
  </UPageSection>
</template>
