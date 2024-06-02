<template>
  
  <div class="flex justify-center content-center">
    <div class="grid grid-cols-2 lg:grid-cols-4">
      <BookCard
        v-for="book in props.books"
        :book="book"
        :key="book.id"
        class="text-sm lg:text-md mx-1 mb-6 col-span-1"
      />
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
//const bookUrl = computed(() => `/Book/${props.book.id}`)

</script>