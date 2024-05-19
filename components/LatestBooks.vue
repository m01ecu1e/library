<template>
  <div class="flex justify-center  w-full h-10">
    <h1 class=" content-center text-lg">Последние поступления</h1>
  </div>
  <div class="grid-cols-12 justify-start mx-5 content-center">
    <ul class="flex">
      <BookCard
        v-for="book in props.books"
        :book="book"
        :key="book.id"
        class="bg-red-300 border h-full mx-1 flex-none"
      />
    </ul>
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