<template>
  <div class="flex flex-col bg-red-400">
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <div v-if="searchBooks">
      <UPagination 
      v-model="page" 
      :page-count= "2"
      :total="totalPages"
      :model-value="currentPage"
      @update:model-value="updatePage"
     />

    </div>

    <SearchedBooks :books="searchBooks" />
  </div>
</template>

<script setup >
function updatePage(){

}

const { fetchBooks, loading, error } = useBooks()

const searchBooks = ref([])
const route = useRoute()
const searchQuery = computed(() => route.query.q)
const skip = computed(() => route.query.skip)
const take = computed(() => route.query.take)

const currentPage = ref(0)

const page = ref(1)

const totalPages = ref(1)

watchEffect(searchQuery,skip,take, () => {
  getBooks()
})

async function getBooks() {

  const books = await fetchBooks({
    query: searchQuery.value,
    skip: skip.value,
    take: take.value
  })

  if (books) {
    searchBooks.value = books[0]
    totalPages.value = books[1]

    console.log("books",books)
  }
}

// console.log("length", searchBooks?.value?.length)

getBooks()

</script>