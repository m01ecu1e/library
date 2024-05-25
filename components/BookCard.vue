<template>
  <UCard>
    <template #header>
      <Placeholder class="h-8" />
      <NuxtLink :to="bookUrl">
        <div class="h-1 grid content-center">
          <div class="font-semibold">
            {{ props.book.title }}
          </div>
        </div>
      </NuxtLink>
    </template>

    <Placeholder class="h-32" />
    <div class="flex">
      <div class="h-40 w-1/6 content-center border">
        <img src="/hard-cover-book.png">
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

    <template #footer>
      <div class="h-1 grid content-center">
        В наличии в {{ props.book.libraryBookCount }} библиотеках
      </div>
      <Placeholder class="h-8" />
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