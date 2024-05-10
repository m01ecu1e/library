<template>
  <div class="flex flex-col bg-red-400">
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <BookListFeed :books="searchBooks" />
  </div>
</template>

<script setup>
const { fetchBooks, loading, error } = useBooks()

const searchBooks = ref([])
const route = useRoute()
const searchQuery = computed(() => route.query.q)


watch(searchQuery, () => {
  console.log("route changed")
  getBooks()
})

async function getBooks() {
  const books = await fetchBooks({
    query: searchQuery.value
  })

  if (books) {
    searchBooks.value = books
  }
}

getBooks()

</script>