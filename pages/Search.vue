<template>
  <div class="flex flex-col justify-center bg-red-400">
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <div class="flex justify-center" v-if="searchBooks">
      <UPagination 
      v-model="page" 
      :page-count= "pageSize"
      :total="totalPages"
     />

    </div>

    <SearchedBooks :books="searchBooks" />
  </div>
</template>

<script setup >

const { fetchBooks, loading, error } = useBooks()

const searchBooks = ref([])
const route = useRoute()
const searchQuery = computed(() => route.query.q)
// const skip = computed(() => route.query.skip)
// const take = computed(() => route.query.take)

const page = ref(route.query.page ? route.query.page : 1)


const totalPages = ref(1)
const pageSize = 3


watch([searchQuery,page], () => {
  console.log(page.value)
  getBooks()
})

async function getBooks() {
  console.log("bobs")
  const skip = (page.value - 1)*pageSize
  const books= await fetchBooks({
    query: searchQuery.value,
    skip: skip,
    take: pageSize
  })

  if (books) {
    searchBooks.value = books.books
    totalPages.value = books.total

    //console.log("books",books)
  }
}

// console.log("length", searchBooks?.value?.length)

getBooks()

</script>