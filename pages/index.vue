<template>

    <UContainer class="grid lg:grid p-0">
      <HomePageSearchBar :user="user"/>
    </UContainer>
    
  <LatestBooks :books="searchBooks" />
</template>

<script setup>
const { fetchLibraryBooks, loading, error } = useBooks()

const searchBooks = ref([])
// const route = useRoute()

const user = useState('auth_user')


async function getBooks() {

  const books = await fetchLibraryBooks()

  if (books) {
    searchBooks.value = books.books
  }
}

getBooks()

</script>