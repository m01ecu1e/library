<template>
  <UCard class="w-full">
    <h3 class="mb-4">Добавить книгу в выбранную библиотеку:</h3>
    <form
          class="flex flex-col"
        >
        <USelectMenu
            v-model="selectedLib"
            :options="libs"
            placeholder="Выберите библиотеку"
            value-attribute="id"
            option-attribute="name"
            class="mb-2"
            size="xl"
        />
          <UInputMenu
            v-model="selectedBook"
            :search="searchBooks"
            :options="books"
            :loading="loading"
            size="xl"
            class="w-96 max-w-full mb-2"
            placeholder="Книга"
            option-attribute="title"
            trailing
            by="id"
          >
          <template #option="{ option: book }">
          <div class="flex-1">
            &laquo;{{ book.title }}&raquo;,&nbsp;{{ book.publisher }}
          </div>
          </template>
          </UInputMenu>
          
          <!-- <div v-if="false">
          <div
            v-if="books.length > 0"
            v-for="book in books"
          >
            <div >{{ book.title, book.publisher }} </div>
          </div>
          <div v-else>
            No results :(
          </div>
          </div> -->
          
        <UInput
            type="text"
            :disabled="loading"
            placeholder="Количество экземпляров (ВСЕГО)"
            v-model="amount"
            class="mb-2"
            required
            size="xl"
          />
        <UInput
            type="text"
            :disabled="loading"
            placeholder="Количество экз., доступных для брони"
            v-model="amountAvailable"
            class="mb-2"
            required
            size="xl"
        />
        <UButton

        :loading="loading"
        :disabled="loading"
        @click="handleAddLibraryBook"
        class="justify-center"
      >
        Добавить
      </UButton>
        </form>
  </UCard>
</template>
<script setup>

const amount = ref()
const amountAvailable = ref()

const books = ref([])
const libs = ref([])

const loading = ref(false)

const selectedBook = ref()
const selectedLib = ref()

const { fetchBooks, error } = useBooks()
const { fetchLibs } = useLibrary()


const searchBooks = async (q) => {
  if (q === '') return []

  loading.value = true

  const response = await fetchBooks({
      query: q,
      skip: 0,
      take: 10
  })
  //console.log(response.books)
  books.value = response.books
  console.log(books.value)
  loading.value = false
  return books.value
}

async function handleAddLibraryBook() {
  const { postLibraryBook } = useBooks()
  loading.value = true
  try {
    await postLibraryBook({
      bookId: selectedBook.value.id,
      amount: Number(amount.value),
      amountAvailable: Number(amountAvailable.value),
      libraryId: selectedLib.value
    })
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false

  }
  console.log("lib:", selectedLib.value)
  console.log(selectedBook.value)
}

const getLibs = async (q) => {
  if (q === '') return []

  loading.value = true

  const response = await fetchLibs()

  libs.value = response.libraries
  console.log(libs.value)
  loading.value = false
  return libs.value
}

getLibs()

// const props = defineProps({
//   libraries: {
//     type: Array,
//     required: true
//   }
// })

// const submit = async (e) => {
//   e.preventDefault()

//   await searchAuthors(query.value)
// }

</script>