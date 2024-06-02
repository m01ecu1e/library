<template>
  <UCard class="border-0 px-1 lg:w-60">
    
    <div class="grid justify-items-center ">
      <div class="shrink-0 w-20 sm:w-20 md:w-28 lg:w-36 content-center shadow-lg">
        <img :src="props.book.coverImage" alt="Обложка книги">
      </div>
      <div class="my-2 h-20 lg:my-2 lg:h-24 w-full content-start lg:content-center">
        <div class="font-semibold text-xs md:text-sm text-ellipsis overflow-hidden">
            {{ props.book.title }}
          </div>
        <div class="flex text-xs md:text-sm text-ellipsis overflow-hidden">
          {{ props.book.author }}
        </div>
        <div class="flex text-xs md:text-sm text-ellipsis overflow-hidden">
          Издательство: <p class="ml-2 font-semibold"> {{ props.book.publisher }}</p>
        </div>
      </div>
    </div>
    <UButton size="xl" :to="bookUrl" class="w-full justify-center">
      Забронировать
    </UButton>

    <template #footer>
      <div class="flex items-center justify-center">
        <p >Книга поступила в: {{ props.book.library }}</p>
        <!-- <p>В наличии в 3 библиотеках</p> -->
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