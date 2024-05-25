<template>
  <div class="flex justify-center h-12 mb-5 w-full rounded-md shadow-lg bg-white">
    <h1 class="content-center text-lg">Последние поступления</h1>
  </div>
  <div class="flex justify-center">
    <LibraryBookCard v-for="book in props.books" :book="book" :key="book.id" class=" border h-full mx-3 flex-none" />
  </div>
</template>

<script setup>

const props = defineProps({
  books: {
    type: Array,
    required: true
  }
})

</script>