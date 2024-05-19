<template>

  <div class="flex flex-col bg-gray-100">
    <!-- Search bar -->
    <div class="row-span-3 content-center ">
      <HomePageSearchBar />
    </div>
    <!-- {{ user }} -->
    <LatestBooks :books="searchBooks" />
  </div>
</template>

<script setup>
const { fetchBooks, loading, error } = useBooks()

const searchBooks = ref([])
const route = useRoute()
const searchQuery = computed(() => route.query.q)

const {useAuthUser} = useAuth()

const user = useAuthUser()


watch(searchQuery, () => {
  console.log("route changed")
  getBooks()
})

async function getBooks() {

  const books = await fetchBooks({
    query: searchQuery.value
  })

  if (books) {
    searchBooks.value = books.books
  }
}

getBooks()

</script>