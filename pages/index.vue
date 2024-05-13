<template>
    
    <MainSection class="flex flex-col bg-red-600">

        Home Page
        <BookListFeed :books="searchBooks"/>
    </MainSection>
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