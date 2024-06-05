<template>
  
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      <BookCard v-for="book in props.books" 
      :book="book" 
      :key="book.id" 
      class="text-sm  lg:text-md mb-6 col-span-1" />
    </div>

</template>

<script setup>

const props = defineProps({
  books: {
    type: Array,
    required: true
  }
})
//const bookUrl = computed(() => `/Book/${props.book.id}`)

</script>