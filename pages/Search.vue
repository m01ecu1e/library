<template>
  <div class="flex flex-col bg-red-400">
    {{ searchQuery }}
    <BookListFeed :books="searchBooks" />
  </div>
</template>

<script setup>
const { getBooks: getBooksComposable } = useBooks()

const searchBooks = ref([])
const route = useRoute()
const searchQuery = computed(() => route.query.q)


watch(searchQuery, () => {
  console.log("route changed")
  getBooks()
})

async function getBooks() {
  console.log("getBooks")
  try {
    const { books } = await getBooksComposable({
      query: searchQuery.value
    })

    searchBooks.value = books

  } catch (error) {
    console.log(error)
  }
}

getBooks()

</script>