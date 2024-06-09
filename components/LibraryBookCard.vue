<template>
  <UCard class="ring-0 shadow-lg">
    
    <div class="grid justify-items-center">
      <div class=" w-20 sm:w-20 md:w-28 lg:w-36 lg:h-60 justify-center content-center">
        <img :src="props.book.coverImage" alt="Обложка книги" class="shadow-l rounded-sm">
      </div>
      <div class="my-2 h-20 lg:my-2 lg:h-24 w-full content-start lg:content-center overflow-hidden ">
        <div class="font-semibold text-xs sm:text-sm md:text-sm ">
            {{ props.book.title }}
          </div>
        <div class="flex text-xs sm:text-sm md:text-md">
          {{ props.book.author }}
        </div>
        <div class="flex text-xs sm:text-sm md:text-md">
          Издательство: <p class="ml-2 font-semibold"> {{ props.book.publisher }}</p>
        </div>
      </div>
    </div>
    <UButton size="xl" :to="bookUrl" class="w-full justify-center">
      Забронировать
    </UButton>

    <template #footer>
      <div class="flex items-center justify-center text-xs lg:text-md">
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