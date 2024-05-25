<template>

  <div class="flex flex-col bg-gray-200">
    <!-- Search bar -->
    <div class="row-span-3 content-center ">
      <HomePageSearchBar :user="user" />
    </div>
    <!-- {{ user }} -->
    <LatestBooks :books="searchBooks" />
  </div>
</template>

<script setup>
const { fetchLibraryBooks, loading, error } = useBooks()

const searchBooks = ref([])
const route = useRoute()
// const searchQuery = computed(() => route.query.q)

// const {useAuthUser} = useAuth()
const user = useState('auth_user')


// watch(searchQuery, () => {
//   console.log("route changed")
//   getBooks()
// })

async function getBooks() {

  const books = await fetchLibraryBooks()

  if (books) {
    searchBooks.value = books.books
  }
}

getBooks()

</script>