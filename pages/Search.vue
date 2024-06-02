<template>
  <UContainer class="grid lg:grid p-0">
    <HomePageSearchBar :user="user" />
  </UContainer>
  
  <div class="flex flex-col justify-center">
    
    <div class="mb-3 mt-2 font-semibold flex justify-center">Найдено результатов: {{ totalPages }}</div>
    <!-- <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div> -->
    <div class="flex justify-center " v-if="searchBooks">
      <UPagination v-model="page" :page-count="pageSize" :total="totalPages" :active-button="{ color: 'sky' }" />
    </div>

    <UDivider class="my-4"></UDivider>
    
    <SearchedBooks :books="searchBooks" />
  </div>
</template>

<script setup>

const { fetchBooks, loading, error } = useBooks()

const searchBooks = ref([])
const route = useRoute()
const searchQuery = computed(() => route.query.q)
// const skip = computed(() => route.query.skip)
// const take = computed(() => route.query.take)

const page = ref(route.query.page ? route.query.page : 1)

const totalPages = ref(1)
const pageSize = 12

watch([searchQuery, page], () => {
  console.log(page.value)
  getBooks()
})

async function getBooks() {
  console.log("bobs")
  const skip = (page.value - 1) * pageSize
  const books = await fetchBooks({
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