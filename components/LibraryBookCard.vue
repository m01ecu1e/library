<template>

  <UCard class="w-64 border-none shadow-lg">
    <template #header>

      <div class="h-6 content-center">
        <NuxtLink :to="bookUrl">
          <p class="font-semibold">
            {{ props.book.title }}
          </p>
        </NuxtLink>
      </div>
    </template>


    <div class="h-50 flex justify-center content-center ">
      <div class="border border-gray-500 shadow-xl">
        <img :src="props.book.coverImage" alt="Обложка">
      </div>
    </div>

    <template #footer>
      <div class="text-sm font-light mb-1 h-20 content-center">
        <p class="">Издательство: {{ props.book.publisher }}</p>
        <p>Книга поступила в: {{ props.book.library }}</p>


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