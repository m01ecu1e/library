<template>
  <UCard class="">
    <template #header>
      <!-- <Placeholder class="h-8" /> -->
      <NuxtLink :to="bookUrl">
        <div class="h-1 grid content-center">
          <div class="font-semibold">
            {{ props.book.title }}
          </div>
        </div>
      </NuxtLink>
    </template>

    <!-- <Placeholder class="h-32" /> -->
    <div class="flex">
      <div class="h-50 w-1/6 content-center border border-gray-400 shadow-lg">
        <!-- <img src="/hard-cover-book.png"> -->
        <img :src="props.book.coverImage" alt="Обложка книги">
        <!-- {{ props.book.coverImage }} -->
      </div>
      <div class="h-40 w-full pl-5 content-center">
        <div class="flex">
          Автор: <p class="ml-2 font-semibold"> {{ props.book.author }}</p>
        </div>
        <div class="flex">
          Издательство: <p class="ml-2 font-semibold"> {{ props.book.publisher }}</p>
        </div>

      </div>

    </div>

    <template #footer v-if="props.book.libraryBookCount > 0" class="justify-start">
      <div class="h-4 grid grid-cols-12 content-center w-1/2">
        <p class="col-span-3 content-center ">В наличии в </p>
        <p class="col-span-1 text-green-600 font-bold">[{{ props.book.libraryBookCount }}]</p>
        <p class="col-span-8">библиотеках</p>
      </div>
    </template>
    <template #footer v-if="props.book.libraryBookCount == 0">
      <div class="h-1 grid content-center font-semibold text-red-600">
        Нет в наличии
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

const bookUrl = computed(() => `/Book/${props.book.id}`)
</script>