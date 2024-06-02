<template>
  <div class="flex justify-center h-12 mb-3 w-full">
    <UDivider label="Последние поступления" />
  </div>

  <div class="flex justify-center content-center">
    <div class="grid grid-cols-2 lg:grid-cols-4">
      <LibraryBookCard v-for="book in props.books" 
      :book="book" 
      :key="book.id" 
      class="text-sm lg:text-md mx-1 mb-6 col-span-1" />
    </div>
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