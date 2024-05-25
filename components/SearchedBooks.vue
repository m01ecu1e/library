<template>
  
  <div class="flex justify-center mx-5 content-center">

    <div class="w-1/2 h-full  ">
      <!-- <NuxtLink :to="bookUrl"> -->
      <BookCard
        v-for="book in props.books"
        :book="book"
        :key="book.id"
        class=" border h-full mx-1 "
      />
      <!-- </NuxtLink> -->
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