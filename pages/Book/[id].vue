<template>
    <h1>СТРАНИЦА КНИГИ </h1>

    <div v-if="book">
        <h1 class="font-semibold">{{ book.title }}</h1>
        <p>
            Автор: {{ book.author }}
        </p>
        <p>
            Издательство: {{ book.publisher }}
        </p>
        <p class="font-semibold">
            В наличии в:
        </p>
        <ul>
            <p v-for="library in libs" :lib="library" :key="library.id">
            <p>
                - - - {{ library.name }} - 
            </p>
            <p class="font-semibold">- - - {{ library.amountAvailable }} экз.</p>
            <p> По адресу: {{ library.address }}</p>
            <br>
            </p>
        </ul>
    </div>
</template>

<script setup>
const { getBookById } = useBooks()
const book = ref(null)
const libs = ref(null)
const route = useRoute()

const bookId = computed(() => route.params.id)

async function getBook() {
    try {
        const response = await getBookById(bookId.value)
        book.value = response.book
        libs.value = response.libs
    } catch (error) {
        console.log(error)
    }
}

getBook()
</script>