<template>
  <UCard class="w-full">
    <h3 class="mb-4">Добавить книгу в выбранную библиотеку:</h3>
    <form @submit="handleAddLibraryBook" class="flex flex-col gap-2">
      <USelectMenu v-model="selectedLib" :options="libs" placeholder="Выберите библиотеку" value-attribute="id"
        option-attribute="name" size="xl" required />
      <UInputMenu v-model="selectedBook" :search="searchBooks" :options="books" :loading="loading" size="xl"
        placeholder="Книга" option-attribute="title" trailing by="id" required>
        <template #option="{ option: book }">
          <div class="flex-1">
            &laquo;{{ book.title }}&raquo;,&nbsp;{{ book.publisher }}
          </div>
        </template>
      </UInputMenu>
      <UInput type="text" :disabled="loading" placeholder="Количество экземпляров (ВСЕГО)" v-model="amount" size="xl" />
      <UInput type="text" :disabled="loading" placeholder="Количество экз., доступных для брони"
        v-model="amountAvailable" size="xl" />
      <UButton :loading="loading" :disabled="loading" @click="handleAddLibraryBook" class="justify-center">
        Добавить
      </UButton>
    </form>
  </UCard>
</template>
<script setup>

const amount = ref()
const amountAvailable = ref()

const toast = useToast()

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
  // console.log(books.value)
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
    toast.add({
      title: 'Успешно:',
      description: 'Книга добавлена в библиотеку',
      icon: 'i-heroicons-check-circle',
      color: 'green'
    })
  } catch (err) {
    // console.log(error)
    if (err.message) {
      // console.log(err.message)
      error.value = err.message
      toast.add({
        title: 'Ошибка:',
        description: '' + error.value + '',
        icon: 'i-heroicons-x-circle',
        color: 'red'
      })
    } else {
      error.value = 'Что-то пошло не так :/'
      toast.add({
        title: 'Ошибка:',
        description: '' + error.value + '',
        icon: 'i-heroicons-x-circle',
        color: 'red'
      })
    }
  } finally {
    loading.value = false

  }
  // console.log("lib:", selectedLib.value)
  // console.log(selectedBook.value)
}

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


</script>