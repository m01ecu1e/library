<template>
    <div class="flex justify-center bg-green-400 w-full h-10">
        <h1 class="bg-green-200 content-center text-lg">Последние поступления</h1>
        
    </div>
    <div class="grid-cols-12 flex justify-start mx-5 content-center w-full bg-blue-300">
        <ul class="flex">
            <BookItem v-for="book in props.books" :book="book"
            :key="book.id" class="bg-red-300 border h-full mx-1 flex-none"/>
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
</script>