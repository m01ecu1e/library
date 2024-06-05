<template>

  <UContainer class="grid lg:grid">
    <HomePageSearchBar />
    <!-- <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      <USkeleton v-if="loading"
        class="text-sm lg:text-md mb-6 col-span-1" />
    </div> -->

    <LatestBooks :books="searchBooks" />
    <div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        <USkeleton v-if="loading" class="h-[380px] w-70 mb-6 col-span-1 rounded-lg" />
        <USkeleton v-if="loading" class="h-[380px] w-70 mb-6 col-span-1 rounded-lg" />
        <USkeleton v-if="loading" class="h-[380px] w-70 mb-6 col-span-1 rounded-lg" />
        <USkeleton v-if="loading" class="h-[380px] w-70 mb-6 col-span-1 rounded-lg" />
        <USkeleton v-if="loading" class="h-[380px] w-70 mb-6 col-span-1 rounded-lg" />
        <USkeleton v-if="loading" class="h-[380px] w-70 mb-6 col-span-1 rounded-lg" />
        <USkeleton v-if="loading" class="h-[380px] w-70 mb-6 col-span-1 rounded-lg" />
        <USkeleton v-if="loading" class="h-[380px] w-70 mb-6 col-span-1 rounded-lg" />
        <USkeleton v-if="loading" class="h-[380px] w-70 mb-6 col-span-1 rounded-lg" />
        <USkeleton v-if="loading" class="h-[380px] w-70 mb-6 col-span-1 rounded-lg" />
        <USkeleton v-if="loading" class="h-[380px] w-70 mb-6 col-span-1 rounded-lg" />
        <USkeleton v-if="loading" class="h-[380px] w-70 mb-6 col-span-1 rounded-lg" />
      </div>
      <!-- <USkeleton v-if="loading" class="h-80 w-full rounded-lg" /> -->
    </div>
    <!-- <div v-if="loading">Загрузка</div> -->
  </UContainer>

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