<template>

  <UCard class="w-64 border-none shadow-lg">
    <template #header>
      <Placeholder class="" />
      <div class="h-10">
        <NuxtLink :to="bookUrl">
          <p class="font-semibold">
            {{ props.book.title }}
          </p>
        </NuxtLink>
      </div>
    </template>

    <Placeholder class="" />
    <div class="h-50">
      <img src="/hard-cover-book.png">
    </div>

    <template #footer>
      <div class="text-sm h-20">
        <p class="">Издательство: {{ props.book.publisher }}</p>
        <p>В наличии в: {{ props.book.library }}</p>
        <Placeholder class="" />

      </div>
    </template>
  </UCard>
</template>

<script setup>
const props = defineProps({
  book: {
    type: Object,
    required: true
  }
})

const bookUrl = computed(() => `/Book/${props.book.bookId}`)
</script>