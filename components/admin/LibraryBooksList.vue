<template>
  <div>
    <div>
      <AdminLibraryBookAccountingCard v-for="libraryBook in props.libraryBooks" 
      :book="libraryBook" 
      :key="libraryBook.id"/>
    </div>
    <!-- <div>
      {{ props.libraryBooks }}
    </div> -->
  </div>
</template>

<script setup>
const props = defineProps({
  libraryBooks: {
    type: Array,
    required: true
  }
})
console.log("libBooksList:", props)
</script>
