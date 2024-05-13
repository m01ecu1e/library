<template>
    <h1>СТРАНИЦА КНИГИ </h1>

    <BookPage v-if="book" :book="book"/>
</template>

<script setup>
const {getBookById} = useBooks()
let book = ref(null)

function getBookIdFromRoute() {
    return useRoute().params.id
}

async function getBook() {
    try {
        const response = await getBookById(getBookIdFromRoute())
        book.value = response.book
    } catch (error) {
        console.log(error);
    }
}

onBeforeMount(() => {
    getBook()
})
</script>