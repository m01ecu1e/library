<template>
  <h1>СТРАНИЦА КНИГИ </h1>

  <div v-if="book">
    <p>
      Автор: {{ book.author }}
    </p>
    <p>
      Издательство: {{ book.publisher }}
    </p>
    <p>
      В наличии в {{ book.libraryBookCount }} библиотеках
    </p>
  </div>
</template>

<script setup>
const { getBookById } = useBooks()
const book = ref(null)
const route = useRoute()

const bookId = computed(() => route.params.id)

async function getBook() {
  try {
    const response = await getBookById(bookId.value)
    book.value = response.book
  } catch (error) {
    console.log(error)
  }
}

getBook()
</script>