<template>

    <UContainer class="grid lg:grid p-0">
      <!-- <HomePageSearchBar :user="user"/> -->
      <HomePageSearchBar/>
    </UContainer>
    <div class="flex flex-col justify-center">
      <LatestBooks :books="searchBooks" />
    </div>
</template>

<script setup>
const { fetchLibraryBooks, loading, error } = useBooks()

const searchBooks = ref([])


async function getBooks() {

  const books = await fetchLibraryBooks()

  if (books) {
    searchBooks.value = books.books
  }
}

getBooks()

</script>