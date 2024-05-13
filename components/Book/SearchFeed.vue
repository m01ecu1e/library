<template>
    <div class="flex justify-center bg-green-400 w-full h-10">
        <h1 class="bg-green-200 content-center text-lg">Найдено: </h1>
    </div>
    <div class="grid-cols-12 justify-start mx-5 content-center bg-blue-300">
        <ul class="w-full">
            <!-- <NuxtLink :to="bookUrl"> -->
                <BookItem v-for="book in props.books" :book="book" :key="book.id"
                    class="bg-red-300 border h-full mx-1 flex-none hover:bg-red-400" />
            <!-- </NuxtLink> -->
        </ul>
    </div>
</template>

<script setup>
const props = defineProps({
    books: {
        type: Array,
        required: true
    }
})
//const bookUrl = computed(() => `/Book/${props.book.id}`)

</script>