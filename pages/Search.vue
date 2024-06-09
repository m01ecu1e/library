<template>
  <UContainer>
    <HomePageSearchBar />

    <div class="mb-3 mt-2 font-semibold flex justify-center">Найдено результатов: {{ totalPages }}</div>

    <UAccordion :items="items" class="">
      <template #filters>
        <div class="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-5">

          <div class="pb-5">
            <UCheckbox v-model="filters.inStock" name="inStock" label="В наличии" />
          </div>

          <USelectMenu v-model="filters.libraryId" :options="libs" placeholder="Библиотека" value-attribute="id"
            option-attribute="name" class="" size="xl" required />

          <UButton :loading="loading" :disabled="loading" @click="resetLibraryFilter"
            class="justify-center my-2">
            Сбросить
          </UButton>

          <UInputMenu
            v-model="filters.publisherId"
            :search="searchPublishers"
            :options="publishers"
            :loading="loading"
            size="xl"
            placeholder="Издательство"
            option-attribute="name"
            trailing
            value-attribute="id"
            required
          />

          <UButton :loading="loading" :disabled="loading" @click="resetPublisherFilter"
            class="justify-center my-2">
            Сбросить
          </UButton>
          <UInput
            v-model.lazy="filters.minYear"
            placeholder="Мин. год"
            required
            class="mb-2"
          />
          <UInput
            v-model.lazy="filters.maxYear"
            placeholder="Макс. год"
            required
          />
          <UButton :loading="loading" :disabled="loading" @click="clearAllFilters"
            class="justify-center my-2">
            Очистить все фильтры
          </UButton>
        </div>
      </template>
    </UAccordion>

    <UDivider class="my-4"></UDivider>
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

    <SearchedBooks :books="searchBooks" />

    <div class="flex justify-center mb-20" v-if="searchBooks">
      <UPagination v-model="page" :page-count="pageSize" :total="totalPages" :active-button="{ color: 'sky' }" />
    </div>

  </UContainer>
</template>

<script setup>
const { fetchBooks, loading, error } = useBooks()
const { fetchLibs } = useLibrary()

const searchBooks = ref([])
const route = useRoute()
const searchQuery = computed(() => route.query.q)

const filters = ref({
  inStock: null,
  libraryId: null,
  publisherId: null,
  minYear: null,
  maxYear: null,
})

const libs = ref([])
const publishers = ref([])
// const selectedLib = ref()

const items = [{
  label: 'Расширенный поиск',
  defaultOpen: false,
  slot: 'filters'
}]

const page = ref(route.query.page ? route.query.page : 1)
const totalPages = ref()
const pageSize = 12

watch([searchQuery, page, filters.value], async() => {
  console.log("watch")
  console.log(filters.value)
  getBooks()
})

async function getBooks() {
  const skip = (page.value - 1) * pageSize
  const params = {
    query: searchQuery.value,
    skip: skip,
    take: pageSize,
    // ...Object.fromEntries(Object.entries(filters.value).filter(([_, v]) => v !== null))
    ...filters.value
  }
  const books = await fetchBooks(params)
  if (books) {
    searchBooks.value = books.books
    totalPages.value = books.total
  }
}

getBooks()

const getLibs = async (q) => {
  if (q === '') return []

  // loading.value = true

  const response = await fetchLibs()

  libs.value = response.libraries
  // loading.value = false
  return libs.value
}

const searchPublishers = async (q) => {
  if (q === '') return []

  // bookLoading.value = true

  const response = await $fetch('/api/publishers/', {
    method: 'GET',
    query: {
      query: q
    }
  })
  publishers.value = response
  
  // bookLoading.value = false
  return publishers.value
}

getLibs()

function resetLibraryFilter() {
  filters.value.libraryId = null
}

function resetPublisherFilter() {
  filters.value.publisherId = null
}

function clearAllFilters() {
  filters.value.publisherId = null
  filters.value.libraryId = null
  filters.value.inStock = false
  filters.value.libraryId = null
  filters.value.minYear = null
  filters.value.maxYear = null
}
</script>