<template>
  <div class="flex justify-center h-12 mb-3 w-full">
    <UDivider label="Последние поступления" />
  </div>


    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      <LibraryBookCard v-for="book in props.books" 
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

</script>