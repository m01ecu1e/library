<template>
    <p>
        Автор: {{ props.book.author }}
    </p>
    <p>
        Издательство: {{ props.book.publisher }}
    </p>
    <p>
        В наличии в {{ props.book.libraryBookCount }} библиотеках
    </p>
</template>

<script setup>
const props = defineProps({
    book: {
        type: Object,
        required: true
    }
})
</script>