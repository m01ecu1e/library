<template>
  <UCard class="w-full">
    <h3 class="mb-4">Посмотреть книги в выбранной библиотеке:</h3>
    <form @submit="handleSearchLibraryBooks" class="flex flex-col gap-2">
      <USelectMenu v-model="selectedLib" :options="libs" placeholder="Выберите библиотеку" value-attribute="id"
        option-attribute="name" size="xl" required />
      <UButton :loading="loading" :disabled="loading" @click="handleSearchLibraryBooks" class="justify-center">
        Показать
      </UButton>
    </form>
    <div v-if="libraryBooks">
      <!-- {{ libraryBooks }} -->
      <AdminLibraryBooksList :libraryBooks="libraryBooks.libraryBooks.libraryBooks"/>
    </div>
  </UCard>
</template>

<script setup>
const { searchLibraryBooks, error } = useBooks()
const loading = ref(false)
const { fetchLibs } = useLibrary()
const libs = ref([])
const libraryBooks = ref(null)
const selectedLib = ref()

console.log(libraryBooks.value)

const getLibs = async (q) => {
  if (q === '') return []

  loading.value = true

  const response = await fetchLibs()

  libs.value = response.libraries
  // console.log(libs.value)
  loading.value = false
  return libs.value
}

getLibs()

const handleSearchLibraryBooks = async (q) => {
  if (q === '') return []

  loading.value = true

  const response = await searchLibraryBooks({
    libraryId: selectedLib.value
  })

  libraryBooks.value = response
  console.log(libraryBooks.value)
  loading.value = false
  return libraryBooks.value
}
</script>
